import { Injectable } from '@angular/core';
import { Training } from 'src/app/models/training/training';
import { TrainingType } from 'src/app/models/training-type/training-type';
import { Interim } from 'src/app/models/interim/interim';
import { StopwatchService } from '../stopwatch/stopwatch.service';
import { SettingsService } from '../settings/settings.service';
import { DatabaseService } from '../database/database.service';
import { StopwatchStatus } from 'src/app/models/stopwatch-status/stopwatch-status';
import { TrainingStatus } from 'src/app/models/training-status/training-status';

@Injectable({
  providedIn: 'root'
})
export class TrainingService
{
    public training: Training = new Training();
    public status: TrainingStatus = TrainingStatus.RESETTED;
    public prevInterim: any = false;
    public nextInterim: any = null;

    constructor(
        public stopwatch: StopwatchService,
        public database: DatabaseService,
        public settings: SettingsService
    )
    { }

    public startNewTraining(type: TrainingType)
    {
        this.training = new Training();
        this.training.trainingType = type;
        this.training.interims = this.settings.getInterimsForTraingType(type);
        this.status = TrainingStatus.RESETTED;
    }

    public ableToStartTiming()
    {
        if (this.training == null)
            return false;

        return this.status == TrainingStatus.RESETTED;
    }

    public ableToTakeInterim()
    {
        return this.status == TrainingStatus.STARTED && this.nextInterim;
    }

    public ableToStopTiming()
    {
        return this.nextInterim == false && this.status == TrainingStatus.STARTED;
    }

    public ableToSaveAndReset()
    {
        return this.status == TrainingStatus.STOPPED;
    }

    public getNextToTakeIterim(): any
    {
        for (let interim of this.training.interims)
        {
            if (interim.isTaken == false)
                return interim;
        }

        return false;
    }

    public getLastTakenInterim()
    {
        this.training.interims.reverse().forEach(
            (interim) => { if (interim.isTaken == true) return interim; }
        );
        return false;
    }

    public startTiming()
    {
        this.stopwatch.start();
        this.nextInterim = this.getNextToTakeIterim();
        this.status = TrainingStatus.STARTED;
    }

    public takeInterim(interim: Interim)
    {
        this.stopwatch.takeInterim(interim);
        this.prevInterim = interim;
        this.nextInterim = this.getNextToTakeIterim();
    }

    public stopTiming() 
    {
        if (this.nextInterim != false)
            return false;
        this.stopwatch.stop();
        this.prevInterim = false;
        this.status = TrainingStatus.STOPPED;
    }

    public save()
    {
        this.database.addTraining(this.training);
        this.status = TrainingStatus.SAVED;
    }

    public reset()
    {
        this.stopwatch.reset();
        this.nextInterim = null;
        this.training = new Training();
        this.status = TrainingStatus.RESETTED;
    }
}
