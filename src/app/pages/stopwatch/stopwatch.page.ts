import { Component, OnInit } from "@angular/core";
import { Training } from "src/app/models/training/training";
import { SettingsService } from "src/app/services/settings/settings.service";
import { DatabaseService } from 'src/app/services/database/database.service';
import { TrainingService } from 'src/app/services/training/training.service';
import { TrainingType } from 'src/app/models/training-type/training-type';

@Component({
	selector: "app-stopwatch",
	templateUrl: "./stopwatch.page.html",
	styleUrls: ["./stopwatch.page.scss"]
})
export class StopwatchPage implements OnInit
{
	private settingsPaneClosed: boolean = false;
	private trainingType: TrainingType = TrainingType.Kuppeln;

	constructor(
		public settings: SettingsService, 
		public trainingManager: TrainingService
	) {
		
	}

	ngOnInit(){}

	private setupTrainingAndStart()
	{
		this.trainingManager.startNewTraining(this.trainingType);
		this.settingsPaneClosed = true;
		this.trainingManager.startTiming();
	}

	private resetTraining()
	{
		this.trainingManager.save();
		this.trainingManager.reset();
		this.settingsPaneClosed = false;
	}
}
