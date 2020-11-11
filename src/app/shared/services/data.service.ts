import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { map, take } from "rxjs/internal/operators";
import { forkJoin, Observable } from "rxjs/index";

import { environment } from "../../../environments/environment";
import { getWeatherIcon } from "../constants/app.constants";
import { Forecast, List, Location } from "../models/models";

@Injectable({
    providedIn: "root"
})
export class DataService {

    private forecastUrl = `${environment.weatherAPI}/forecast`;
    private weatherUrl = `${environment.weatherAPI}/weather`;

    constructor(private http: HttpClient) {
    }

    /**
     * Gets the forecast for a city by zipcode
     * @param {string} zip
     * @returns {Observable<any>}
     */
    public getForecastByZip(zip: string): Observable<Forecast> {
        const params = new HttpParams({fromObject: {zip: `${zip},us`, appid: environment.weatherApiKey}});
        return this.http.get(this.forecastUrl, {params})
            .pipe(
                take(1),
                map((response: Forecast) => {
                    // 1. Group by date the list with forecastItems
                    // 2. Delete either first day or last day (we provide forecast for 5 days, but get for 6 days,
                    // due to openweather api specific
                    const list = this.reduceForecastDays(this.groupByDate(response.list)).map(i => {
                        return {
                            ...i,
                            // 3. For each day, combine all the forecast items. We get one forecast item for every
                            // 3 hours - 8 for the whole day
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

    /**
     * Groups the forecast items by date, because we get them in a flat structure
     * @param {any[]} forecastList
     * @returns {any}
     */
    private groupByDate(forecastList: List[]) {
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
    private reduceForecastDays(list: List[]) {
        if (list.length !== 5) {
            const dayToDeleteIndex = list[0].forecastItems.length >= list[5].forecastItems.length ? 5 : 0;
            list.splice(dayToDeleteIndex, 1);
        }

        return list;
    }

    /**
     * Combines the data for the day from all the forecast items - 8 per day
     * @param {List[]} forecastItems
     * @returns {any}
     */
    private getDeterminingDataForDay(forecastItems: List[]) {
        const determiningData = forecastItems.reduce((acc, current) => {
                const weatherKey = current.weather[0].main;
                const max = Math.max(acc.max, current.main.temp_max);
                const min = Math.min(acc.min, current.main.temp_min);
                return {
                    min,
                    max,
                    weatherGrouped: {
                        [weatherKey]: (acc.weatherGrouped[weatherKey] || 0) + 1
                    },
                    icon: ''
                };
            },
            {
                min: 1000,
                max: 0,
                weatherGrouped: {},
                icon: ''
            }
        );

        determiningData.weatherGrouped = Object.keys(determiningData.weatherGrouped).reduce((acc, key) => {
            return determiningData.weatherGrouped[acc] < determiningData.weatherGrouped[key] ? key : acc;
        }, Object.keys(determiningData.weatherGrouped)[0]);

        determiningData.icon = getWeatherIcon(<string>determiningData.weatherGrouped);

        return determiningData;
    }

    /**
     * Requests a list with locations by zipcode
     * @param {string[]} locationIds
     * @returns {Observable<[Location]>}
     */
    getLocations(locationIds: string[]): Observable<Location[]> {
        return forkJoin(locationIds.map(id => {
            const params = new HttpParams({fromObject: {zip: `${id},us`, appid: environment.weatherApiKey}});
            return this.http.get(
                this.weatherUrl, {params}
            ).pipe(map(
                (res: any) => ({...res, zip: id, icon: getWeatherIcon(res.weather[0].main)})
            ));
        }));
    }

    /**
     * Makes a request to get the data regarding current weather for a location.
     * @param formValue
     * @returns {Observable<{zip: string; icon: string}>}
     */
    submitNewLocation(formValue: {zip: string}): Observable<Location> {
        const newLocation = formValue.zip;
        const params = new HttpParams({fromObject: {zip: `${newLocation},us`, appid: environment.weatherApiKey}});

        return this.http.get(this.weatherUrl, {params}).pipe(
            take(1),
            map((res: any) => ({...res, zip: newLocation, icon: getWeatherIcon(res.weather[0].main)}))
        );
    }
}
