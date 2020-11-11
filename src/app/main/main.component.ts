import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { take } from "rxjs/internal/operators";
import { HttpClient } from "@angular/common/http";

import { DataService } from "../shared/services/data.service";
import { LocalStorageService } from "../shared/services/local-storage.service";
import { locationsStorageKey } from "../shared/constants/app.constants";
import { Location } from "../shared/models/models";

@Component({
    selector: "app-main",
    templateUrl: "./main.component.html",
    styleUrls: ["./main.component.css"]
})
export class MainComponent implements OnInit {

    locationIds: string[] = [];
    locationsData: Location[] = [];

    constructor(
        private http: HttpClient,
        private fb: FormBuilder,
        private dataService: DataService,
        private localStorage: LocalStorageService) {
    }

    ngOnInit(): void {
        this.getPersistedLocations();
    }

    /**
     * Loads the location with zipcodes stored in localStorage
     */
    private getPersistedLocations(): void {
        const locations = JSON.parse(this.localStorage.getItem(locationsStorageKey));
        this.dataService.getLocations(locations).pipe(take(1)).subscribe((data: Location[]) => {
            this.locationsData = data;
        });
    }

    /**
     * Makes request to get the info for a new location
     * @param {{zip: string}} formValue
     */
    submitNewLocation(formValue: {zip: string}) {
        this.dataService.submitNewLocation(formValue).pipe(take(1)).subscribe((response: Location) => {
            // add on top of the lsit
            this.locationsData = [response].concat(this.locationsData);
            this.locationIds.push(formValue.zip);
            this.localStorage.setItem(locationsStorageKey, JSON.stringify(this.locationIds));
        }, err => {
            //TODO handle errors
        });
    }

    /**
     * Removes the location identidied by zipcode from the local lists and localStorage
     * @param {string} zip
     */
    deleteLocation(zip: string) {
        this.locationsData = this.locationsData.filter(i => i.zip !== zip);
        this.locationIds = this.locationIds.filter(i => i !== zip);
        this.localStorage.setItem(locationsStorageKey,JSON.stringify(this.locationIds));
    }

}
