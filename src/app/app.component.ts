import { Component, HostListener, OnDestroy, OnInit } from "@angular/core";
import { LocalStorageService } from "./shared/services/local-storage.service";
import { StoreService } from "./shared/services/store.service";
import { take } from "rxjs/internal/operators";

@Component({
    selector: "my-app",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
    name = "Angular";

    constructor(
        private localStorage: LocalStorageService,
        private store: StoreService
    ) {
    }

    ngOnInit() {
        const persistedLocations = JSON.parse(this.localStorage.getItem("locations") || []);
        this.store.next('locations', persistedLocations);
    }

    @HostListener('window:beforeunload')
    ngOnDestroy(){
        this.store.state$.pipe(take(1)).subscribe(state => {
            this.localStorage.setItem('locations', JSON.stringify(state.locations));
        })
    }
}
