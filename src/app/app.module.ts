import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { HelloComponent } from "./hello.component";
import { MainModule } from "./main/main.module";
import { AppRoutingModule } from "./app-routing.module";
import { APP_BASE_HREF } from "@angular/common";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        MainModule,
    ],
    declarations: [AppComponent, HelloComponent],
    bootstrap: [AppComponent],
    providers: [{provide: APP_BASE_HREF, useValue : '/' }]
})
export class AppModule {
}
