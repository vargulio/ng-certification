import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { MainModule } from "./main/main.module";
import { AppRoutingModule } from "./app-routing.module";



@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        MainModule,
        AppRoutingModule
    ],
    declarations: [AppComponent],
    bootstrap: [AppComponent],
})
export class AppModule {
}
