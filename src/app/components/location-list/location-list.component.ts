import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: "app-location-list",
    templateUrl: "./location-list.component.html",
})
export class LocationListComponent {

    @Input() locationsList = [];
    @Output() delete: EventEmitter<string> = new EventEmitter<string>();

    /**
     * Emits the zipcode on clicking on the x to delete the location
     * @param {string} zip
     */
    onDelete(zip: string) {
        this.delete.emit(zip);
    }

}
