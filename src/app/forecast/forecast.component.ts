import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs/index";

import { DataService } from "../shared/services/data.service";
import { Forecast } from "../shared/models/models";

@Component({
    selector: "app-forecast",
    templateUrl: "./forecast.component.html",
    styleUrls: ["./forecast.component.css"]
})
export class ForecastComponent implements OnInit {

    constructor(
        private activatedRoute: ActivatedRoute,
        private dataService: DataService) {
    }

    public data$:  Observable<Forecast>;

    /**
     * Gets the zipcode from the url param and requests the
     * forecast data for the specified location.
     */
    ngOnInit(): void {
        const zip = this.activatedRoute.snapshot.params.zipcode;
        this.data$ = this.dataService.getForecastByZip(zip);
    }
}
