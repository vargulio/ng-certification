import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { zipCodePattern } from "../../shared/constants/app.constants";

@Component({
    selector: "app-add-location",
    templateUrl: "./add-location.component.html"
})
export class AddLocationComponent implements OnInit {

    @Input() locationsList: Location[] = [];

    @Output() submit: EventEmitter<any> = new EventEmitter<any>();

    createLocationForm: FormGroup = null;

    constructor(private fb: FormBuilder) {
    }

    ngOnInit(): void {
        this.initForm();
    }

    /**
     * Creates the create location form
     */
    private initForm() {
        this.createLocationForm = this.fb.group({
            "zip": ["", [Validators.required, Validators.pattern(zipCodePattern)]]
        });
    }

    /**
     * If the locationList doesn't contain the new zipcode emit an event
     * to add the location in the list.
     *
     * Clears the form afterwards.
     *
     * If the list already contains the zipcode, sets a duplicate error.
     */
    submitNewLocation() {
        const newLocation = this.createLocationForm.value.zip;
        if (!this.locationsList.includes(newLocation)) {
            this.submit.emit(this.createLocationForm.value);
            this.createLocationForm.controls.zip.setValue('');
            this.createLocationForm.controls.zip.setErrors(null);
        } else {
            this.createLocationForm.controls.zip.setErrors({duplicate: true})
        }
    }

}
