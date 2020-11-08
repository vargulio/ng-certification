import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { zipCodePattern } from "../shared/constants/app.constants";
import { StoreService } from "../shared/services/store.service";
import { Subject } from "rxjs/index";
import { takeUntil } from "rxjs/internal/operators";

@Component({
    selector: "app-main",
    templateUrl: "./main.component.html",
    styleUrls: ["./main.component.css"]
})
export class MainComponent implements OnInit, OnDestroy {

    createLocationForm: FormGroup;
    private destroyed$: Subject<boolean> = new Subject<boolean>();
    private locationsList = [];

    constructor(
        private fb: FormBuilder,
        private store: StoreService) {
        this.store.state$.pipe(takeUntil(this.destroyed$)).subscribe(state => {
                debugger;
                this.locationsList = state.locations || [];
            }
        );
    }


    private initForm() {
        this.createLocationForm = this.fb.group({
            "zip": ["", [Validators.required, Validators.pattern(zipCodePattern)]]
        });
    }

    submitNewLocation() {
        const newLocation = this.createLocationForm.value.zip;
        if (!this.locationsList.includes(newLocation)) {
            this.locationsList.push(newLocation);
            this.store.next("locations", this.locationsList);
            this.createLocationForm.controls.zip.setValue('');
        } else {
            this.createLocationForm.controls.zip.setErrors({duplicate: true})
        }
    }


    ngOnInit(): void {
        this.initForm();
    }

    ngOnDestroy(): void {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }

}
