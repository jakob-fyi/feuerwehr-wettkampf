
import { TrainingType } from "src/app/models/training-type/training-type";
import { Interim } from '../interim/interim';

export class Training 
{
	public id: any = null;
	public recordDate: Date = new Date();
	public trainingType: TrainingType;
	public interims: Array<Interim> = [];
	public totalTime: number = 0;
	public notes: string = "";
}