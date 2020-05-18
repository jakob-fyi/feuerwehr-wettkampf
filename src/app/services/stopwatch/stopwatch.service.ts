import { Injectable } from '@angular/core';
import { Interim } from 'src/app/models/interim/interim';
import { StopwatchStatus } from 'src/app/models/stopwatch-status/stopwatch-status';

@Injectable({
  providedIn: 'root'
})
export class StopwatchService
{
    public status: StopwatchStatus = StopwatchStatus.RESETTED;
    private startTime: number = 0;
    private endTime: number = 0;
    private differentialInterval: any;
    
    private _currentDifferential: number = 0;
    public get currentDifferential(): any 
    {
        return (this._currentDifferential / 1000).toFixed(2);
    }

    private updateDifferential() 
    {
        if (this.status == StopwatchStatus.RUNNING)
        {
            this._currentDifferential = this.millis - this.startTime;
        }
        else 
        {
            clearInterval(this.differentialInterval);
        }
    }

    private get millis(): number 
    {
        return new Date().getTime();
    }

    public start(): boolean 
    {
        if (this.status != StopwatchStatus.RESETTED) 
            return false;
        
        this.startTime = this.millis;
        this.status = StopwatchStatus.RUNNING;

        this.differentialInterval = setInterval(() => this.updateDifferential(), 10);

        return true;
    }

    public takeInterim(interim: Interim) 
    {
        if(interim.isTaken == true)
            throw new Error("Die Zeit für " + interim.name + " wurde bereits genommen!")

        interim.time = this.currentDifferential;

        return interim;
    }

    public stop(): number 
    {
        this.status = StopwatchStatus.STOPPED;
        this.endTime = this.currentDifferential;
        return this.endTime;
    }

    public reset()
    {
        this.status = StopwatchStatus.RESETTED;
        this.startTime = 0;
        this.endTime = 0;
        this._currentDifferential = 0;
        clearInterval(this.differentialInterval);
    }
}
