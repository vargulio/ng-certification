import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    const zip = this.activatedRoute.snapshot.params.zipcode;
  }

}
