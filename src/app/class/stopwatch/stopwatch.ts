import { Time } from "@angular/common";
import { unsupported } from "@angular/compiler/src/render3/view/util";
import { Interim } from "../interim/interim";

export class Stopwatch {
	private status = {
		started: false,
		running: false,
		ended: false
	};
	private startTime: number;
	private pauseTime: number;
	private endTime: number;

	// Not use saving, because Training class Instance saves Interimen also
	private interims: Array<Interim> = [];

	private differentialInterval: any;

	private _currentDifferential: number = 0;
	public get currentDifferential(): any {
		return (this._currentDifferential / 1000).toFixed(2);
	}

	/*********************************************************************
	 * Methods
	 *********************************************************************/

	constructor() {}

	private updateDifferential() {
		if (this.status.running && !this.status.ended) {
			this._currentDifferential = this.millis - this.startTime;
		} else {
			clearInterval(this.differentialInterval);
		}
	}

	private get millis(): number {
		return new Date().getTime();
	}

	public get RunningStatus() {
		return this.status.running;
	}

	public start(): boolean {
		if (this.status.running) return false;
		if (this.status.started) {
			this.startTime = this.millis - this._currentDifferential;
		} else {
			this.startTime = this.millis;

			this.status.started = true;
			this.status.ended = false;
		}
		this.status.running = true;

		this.differentialInterval = setInterval(() => {
			this.updateDifferential();
		}, 10);

		return true;
	}

	public takeInterimNow(_interim: Interim): Interim {
		_interim.time = this.currentDifferential;
		this.interims.push(_interim); // Internal Interim logging

		return _interim;
	}

	/*
	public pause() {
		if (!this.status.running) return false;
		this.status.running = false;
		return this.currentDifferential;
    }
    */

	public stop(): number {
		this.status.running = false;
		this.status.ended = true;
		return this.currentDifferential;
	}
}
