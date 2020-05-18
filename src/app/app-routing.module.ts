import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { TrainingsPage } from "./pages/trainings/trainings.page";
import { SettingsPage } from "./pages/settings/settings.page";
import { TimingPage } from "./pages/timing/timing.page";

const routes: Routes = [
    {
        path: "",
        redirectTo: "timing",
        pathMatch: "full",
    },
    {
        path: "timing",
        component: TimingPage,
    },
    {
        path: "trainings",
        component: TrainingsPage,
    },
    {
        path: "settings",
        component: SettingsPage,
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule { }
