import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from "@angular/core";
import { getWeatherIcon } from "../../shared/constants/app.constants";

@Component({
    selector: "app-location-list",
    templateUrl: "./location-list.component.html",
    styleUrls: ["./location-list.component.css"]
})
export class LocationListComponent {

    private _locationsList: any[];


    @Input() set locationsList(locationList: any[]){
        this._locationsList = locationList.map(i => ({...i, icon: getWeatherIcon(i.weather[0].main)}));
    }



    @Output() delete: EventEmitter<string> = new EventEmitter<string>();

    onDelete(zip: string) {
        this.delete.emit(zip);
    }

}
