import { Injectable } from "@angular/core";
import { IStorageProvider } from "src/app/interfaces/storage-provider";
import { SQLite } from "@ionic-native/sqlite/ngx";
import { LoggerService } from "../../logger/logger.service";
import { Training } from "src/app/models/training/training";

@Injectable({
    providedIn: "root",
})
export class LocalStorageProviderService implements IStorageProvider
{
    private data: any = null;
    private name: string = "feuerwehr_wettkampf";

    constructor(public logger: LoggerService)
    {
        this.createDbIfNotExists();
    }

    private createDbIfNotExists()
    {
        return new Promise((resolve, reject) =>
        {
            if (window.localStorage.getItem(this.name) == null)
            {
                let initObj = { trainings: [] };
                window.localStorage.setItem(this.name, JSON.stringify(initObj));
            }

            resolve();
        });
    }

    public readTrainings()
    {
        return new Promise((resolve, reject) =>
        {
            this.read();
            resolve(this.data.trainings);
        });
    }

    public addTraining(training: Training)
    {
        return new Promise((resolve, reject) =>
        {
            training.id = Date.now();
            this.data.trainings.push(training);
            this.write();
            resolve(training);
        });
    }

    private read()
    {
        this.data = JSON.parse(window.localStorage.getItem(this.name));
        return this.data;
    }

    private write()
    {
        window.localStorage.setItem(this.name, JSON.stringify(this.data));
    }
}
