import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { of, forkJoin } from "rxjs/index";
import { catchError, map, take } from "rxjs/internal/operators";
import { HttpClient, HttpParams } from "@angular/common/http";

import { StoreService } from "../shared/services/store.service";
import { environment } from "../../environments/environment";

@Component({
    selector: "app-main",
    templateUrl: "./main.component.html",
    styleUrls: ["./main.component.css"]
})
export class MainComponent implements OnInit {

    private locationIds = [];

    locationsData = [];

    constructor(
        private http: HttpClient,
        private fb: FormBuilder,
        private store: StoreService) {

    }

    ngOnInit(): void {
        this.getPersistedLocations();
    }

    private getPersistedLocations() {
        this.store.state$.pipe(take(1)).subscribe(state => {
                this.getLocations(state.locations);
                this.locationIds = state.locations || [];
            }
        );
    }


    private getLocations(locationIds: string[]) {
        const newLocations = locationIds.map(id => {
            const params = new HttpParams({fromObject: {zip: `${id},us`, appid: environment.weatherApiKey}});
            return this.http.get(
                environment.weatherAPI, {params}
            ).pipe(map(
                res => ({...res, zip: id})
            ));
        });
        forkJoin(newLocations).pipe(take(1), catchError(err => {
            return of(err);
        })).subscribe(locationsData => {
            this.locationsData = this.locationsData.concat(locationsData);
        });

    }


    submitNewLocation(formValue: any) {
        const newLocation = formValue.zip;
        const params = new HttpParams({fromObject: {zip: `${newLocation},us`, appid: environment.weatherApiKey}});

        this.http.get(environment.weatherAPI, {params}).pipe(
            take(1),
            map(res => ({...res, zip: newLocation}))
        ).subscribe(response => {
            this.store.next("locations", this.locationIds.concat([newLocation]));
            // add on top of the lsit
            this.locationsData = [response].concat(this.locationsData);
        }, err => {
            //TODO handle errors
        });
    }

    deleteLocation(zip: string) {
        this.locationsData = this.locationsData.filter(i => i.zip !== zip);
        this.locationIds = this.locationIds.filter(i => i !== zip);
        this.store.next("locations", this.locationIds);
    }

}
