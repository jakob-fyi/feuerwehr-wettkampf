import { Injectable } from "@angular/core";
import { IStorageProvider } from "src/app/interfaces/storage-provider";
import { SQLite } from "@ionic-native/sqlite/ngx";
import { LoggerService } from "../../logger/logger.service";
import { Training } from "src/app/models/training/training";
import { ISettings } from 'src/app/interfaces/settings';

@Injectable({
    providedIn: "root",
})
export class LocalStorageProviderService implements IStorageProvider
{
    private prefix: string = "feuerwehr_wettkampf";
    private slugTrainings = this.prefix + "_trainings";
    private slugSettings = this.prefix + "_settings";

    constructor(public logger: LoggerService)
    {
        this.createStorageIfNotExists();
    }

    private read = (slug) => JSON.parse(window.localStorage.getItem(slug));
    private write = (slug, data) => window.localStorage.setItem(slug, JSON.stringify(data));

    private createStorageIfNotExists()
    {
        if (window.localStorage.getItem(this.slugTrainings) == null)
        {
            this.write(this.slugTrainings, []);
        }
    }

    public readTrainings = () => new Promise((resolve) => resolve(this.read(this.slugTrainings)));
    public addTraining = (training: Training) => new Promise((resolve) =>
    {
        training.id = Date.now();
        let currentTrainingStore = this.read(this.slugTrainings);
        currentTrainingStore.push(training);
        this.write(this.slugTrainings, currentTrainingStore);
        resolve(currentTrainingStore);
    });

    public readSettings = () => new Promise((resolve) => resolve(this.read(this.slugSettings)));
    public writeSettings = (settings: ISettings) => new Promise((resolve) =>
    {
        this.write(this.slugSettings, settings);
        resolve();
    });
}
