import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AddLocationComponent } from "./add-location/add-location.component";
import { ReactiveFormsModule } from "@angular/forms";
import { LocationListComponent } from './location-list/location-list.component';
import { RouterModule } from "@angular/router";

/**
 * Here we separate the dumb components.
 */
@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule
    ],
    declarations: [AddLocationComponent, LocationListComponent],
    exports: [AddLocationComponent, LocationListComponent]
})
export class ComponentsModule {
}
