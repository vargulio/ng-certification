import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { take } from "rxjs/internal/operators";
import { DataService } from "../shared/services/data.service";
import { Observable } from "rxjs/index";

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

    public data$:  Observable<any[]>;

    ngOnInit(): void {
        const zip = this.activatedRoute.snapshot.params.zipcode;
        this.data$ = this.dataService.getForecastByZip(zip);
    }



}
