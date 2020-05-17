import { Component, OnInit } from "@angular/core";
import { Stopwatch } from "src/app/class/stopwatch/stopwatch";
import { Training } from "src/app/class/training/training";
import { SettingsService } from "src/app/services/settings/settings.service";

@Component({
	selector: "app-stopwatch",
	templateUrl: "./stopwatch.page.html",
	styleUrls: ["./stopwatch.page.scss"]
})
export class StopwatchPage implements OnInit {
	private training: Training;
	private settingsPaneClosed: boolean = false;

	constructor(public settings: SettingsService) {}

	ngOnInit() {
		this.training = new Training(
			Training.Trainingstype.Gesamt,
			this.settings.interims
		);

		//this.steps.start.name = "Zeitnehmung beginnen";

		//this.steps.interim.name = "Zeitnehmung beginnen";
	}

	public resetTraining() {
		this.settingsPaneClosed = false;
		this.training = this.training = new Training(
			Training.Trainingstype.Gesamt,
			this.settings.interims
		);
	}
}
