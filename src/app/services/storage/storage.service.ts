import { Injectable } from "@angular/core";
import { Training } from "src/app/models/training/training";
import { Platform } from "@ionic/angular";
import { SQLiteProviderService } from "src/app/services/storage-providers/sqlite-provider/sqlite-provider.service";
import { LocalStorageProviderService } from "../storage-providers/localstorage-provider/local-storage-provider.service";

@Injectable({
    providedIn: "root",
})
export class StorageService
{
    public trainings: Array<Training> = [];
    public storageProvider = null;

    constructor(
        public platform: Platform,
        private sqiteProvider: SQLiteProviderService,
        private localSorageProvider: LocalStorageProviderService
    )
    {
        if (this.platform.is("cordova"))
        {
            this.storageProvider = this.sqiteProvider;
        } else
        {
            this.storageProvider = this.localSorageProvider;
        }

        this.readTrainings();
    }

    private readTrainings()
    {
        this.storageProvider
            .readTrainings()
            .then((trainings: Array<Training>) => (this.trainings = trainings));
    }

    public addTraining(training: Training)
    {
        this.storageProvider.addTraining(training).then(() => this.readTrainings());
    }
}
