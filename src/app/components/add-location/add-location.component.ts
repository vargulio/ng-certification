import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { zipCodePattern } from "../../shared/constants/app.constants";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: "app-add-location",
    templateUrl: "./add-location.component.html",
    styleUrls: ["./add-location.component.css"]
})
export class AddLocationComponent implements OnInit {

    @Input() locationsList: any[] = [];

    @Output() submit: EventEmitter<any> = new EventEmitter<any>();

    createLocationForm: FormGroup;

    constructor(private fb: FormBuilder) {
    }

    ngOnInit(): void {
        this.initForm();
    }

    private initForm() {
        this.createLocationForm = this.fb.group({
            "zip": ["", [Validators.required, Validators.pattern(zipCodePattern)]]
        });
    }

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
