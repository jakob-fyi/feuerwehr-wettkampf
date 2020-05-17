import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { StopwatchPage } from "./pages/stopwatch/stopwatch.page";
import { TrainingsPage } from "./pages/trainings/trainings.page";
import { SettingsPage } from "./pages/settings/settings.page";

const routes: Routes = [
	{
		path: "",
		redirectTo: "folder/Inbox",
		pathMatch: "full"
	},
	{
		path: "stopwatch",
		component: StopwatchPage
	},
	{
		path: "trainings",
		component: TrainingsPage
	},
	{
		path: "settings",
		component: SettingsPage
	}
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
	],
	exports: [RouterModule]
})
export class AppRoutingModule {}
