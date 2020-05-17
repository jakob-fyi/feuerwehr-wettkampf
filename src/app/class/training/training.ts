import { Stopwatch } from "../stopwatch/stopwatch";
import { Interim } from "../interim/interim";
import { SettingsService } from "src/app/services/settings/settings.service";
import { Errors } from "../errors/errors";

export class Training {
	public aufnahmeDate: Date;
	public trainingsType: Training.Trainingstype;
	public recordedInterims: Array<Interim> = [];
	public toTakeInterims: Array<Interim> = [];
	public endzeit: number;

	private timing: Stopwatch;

	public constructor(
		_trainingsType: Training.Trainingstype,
		_settingsInterims?: any
	) {
		this.aufnahmeDate = new Date();
		this.trainingsType = _trainingsType;
		this.timing = new Stopwatch();
		if (_settingsInterims) {
			_settingsInterims.forEach(el =>
				this.toTakeInterims.push(new Interim(0, el.name))
			);
		}
	}

	public startTiming() {
		this.timing.start();
	}

	public takeInterim(_toTakeIterim?: Interim): boolean {
		try {
			// If not specified => get next Interim to Take
			if (!_toTakeIterim) _toTakeIterim = this.getNextToTakeIterim();

			// If getNextToTakeIterim() returns false - throw error
			if (!_toTakeIterim)
				throw new Errors.Interims.NoNextInterimToTakeError();

			// Set toTake Interim to returned timed Interim => taken == true (!)
			_toTakeIterim = this.timing.takeInterimNow(_toTakeIterim);
			this.recordedInterims.push(_toTakeIterim);
		} catch (e) {
			if (e.name == "NoNextInterimToTakeError") alert(e.message);
			else console.error(e);
		}

		return true;
	}

	public stopTiming() {
		this.timing.stop();
	}

	public getNextToTakeIterim(): Interim {
		let found = this.toTakeInterims.find(el => el.taken == false);
		return found;
	}
}

export namespace Training {
	export enum Trainingstype {
		Kuppeln = "kuppeln",
		Gesamt = "gesamt"
	}
}
