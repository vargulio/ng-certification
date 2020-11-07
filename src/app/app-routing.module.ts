import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { MainComponent } from "./main/main.component";
const routes: Routes = [
    {
        path: '',
        component: MainComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}