import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { map, take } from "rxjs/internal/operators";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs/index";
import { getWeatherIcon } from "../constants/app.constants";

@Injectable({
    providedIn: "root"
})
export class DataService {

    private forecastUrl = `${environment.weatherAPI}/forecast`;
    private weatherUrl = `${environment.weatherAPI}/weather`;

    constructor(private http: HttpClient) {
    }


    public getForecastByZip(zip: string): Observable<any> {
        const params = new HttpParams({fromObject: {zip: `${zip},us`, appid: environment.weatherApiKey}});
        return this.http.get(this.forecastUrl, {params})
            .pipe(
                take(1),
                map((response: any) => {
                    const list = this.reduceForecastDays(this.groupByDate(response.list)).map(i => {
                        return {
                            ...i,
                            forecastItems: this.getDeterminingDataForDay(i.forecastItems)
                        };
                    });
                    return {
                        ...response,
                        list
                    };
                })
            );
    }

    private groupByDate(forecastList: any[]) {
        if (!forecastList || !Array.isArray(forecastList)) {
            return null;
        }

        return forecastList.reduce((acc, current) => {
            const date = current.dt_txt.split(" ")[0];
            const currentGroup = acc.find(i => i.date === date);
            if (currentGroup) {
                currentGroup.forecastItems.push(current);
            } else {
                acc.push({
                    date,
                    forecastItems: [current]
                });
            }
            return acc;

        }, []);
    }

    /**
     * This is neccessary because we get forecast for 6 days in most cases,
     * so we either have to exclude today, or the last day.
     */
    private reduceForecastDays(list: any[]) {
        if (list.length !== 5) {
            const dayToDeleteIndex = list[0].forecastItems.length >= list[5].forecastItems.length ? 5 : 0;
            list.splice(dayToDeleteIndex, 1);
        }

        return list;
    }

    private getDeterminingDataForDay(forecastItems: any[]) {
        const determiningData = forecastItems.reduce((acc, current) => {
                const weatherKey = current.weather[0].main;
                const max = Math.max(acc.max, current.main.temp_max);
                const min = Math.min(acc.min, current.main.temp_min);
                return {
                    min,
                    max,
                    weatherGrouped: {
                        [weatherKey]: (acc.weatherGrouped[weatherKey] || 0) + 1
                    }
                };
            },
            {
                min: 1000,
                max: 0,
                weatherGrouped: {}
            }
        );

        determiningData.weatherGrouped = Object.keys(determiningData.weatherGrouped).reduce((acc, key) => {
            return determiningData.weatherGrouped[acc] < determiningData.weatherGrouped[key] ? key : acc;
        }, Object.keys(determiningData.weatherGrouped)[0]);

        determiningData.icon = getWeatherIcon(determiningData.weatherGrouped);
        return determiningData;
    }
}
