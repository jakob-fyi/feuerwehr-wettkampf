import { Training } from "../models/training/training";

export interface IStorageProvider
{
    readTrainings();
    addTraining(training: Training);
}
