import { Training } from "../models/training/training";
import { ISettings } from './settings';

export interface IStorageProvider
{
    readTrainings();
    addTraining(training: Training);

    readSettings();
    writeSettings(settings: ISettings);
}
