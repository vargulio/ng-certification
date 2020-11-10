import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { MainComponent } from "./main.component";
import { ComponentsModule } from "../components/components.module";
import { HttpClientModule } from "@angular/common/http";
import { MainRoutingModule } from "./main-routing.module";

@NgModule({
    declarations: [MainComponent],
    imports: [
        HttpClientModule,
        CommonModule,
        ReactiveFormsModule,
        ComponentsModule,
        MainRoutingModule,
    ],
    exports: [
        MainComponent
    ]
})
export class MainModule {
}
