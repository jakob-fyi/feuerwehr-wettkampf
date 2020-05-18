import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { TimingPage } from "./timing.page";

const routes: Routes = [
    {
        path: "",
        component: TimingPage,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TimingPageRoutingModule { }
