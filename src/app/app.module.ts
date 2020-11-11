import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { HelloComponent } from "./hello.component";
import { MainModule } from "./main/main.module";
import { AppRoutingModule } from "./app-routing.module";
import { MainComponent } from "./main/main.component";
import { RouterModule, Routes } from "@angular/router";


const routes: Routes = [
    {
        path: 'forecast',
        loadChildren: () => import('./forecast/forecast.module').then(m => m.ForecastModule)
    },
    {
        path: '',
        component: MainComponent
    },
];


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        RouterModule.forRoot(routes),
        MainModule,
    ],
    declarations: [AppComponent, HelloComponent],
    bootstrap: [AppComponent],
})
export class AppModule {
}
