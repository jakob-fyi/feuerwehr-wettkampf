import { Injectable } from "@angular/core";
import { IStorageProvider } from "src/app/interfaces/storage-provider";
import { SQLite, SQLiteObject } from "@ionic-native/sqlite/ngx";
import { LoggerService } from "../../logger/logger.service";
import { Training } from "src/app/models/training/training";
import { Platform } from "@ionic/angular";

@Injectable({
    providedIn: "root",
})
export class SQLiteProviderService implements IStorageProvider
{
    private data: any = null;
    private name: string = "feuerwehr_wettkampf.db";

    constructor(
        private platform: Platform,
        private sqlite: SQLite,
        public logger: LoggerService
    )
    {
        if (this.platform.is("cordova")) this.createDbIfNotExists();
    }

    private createDbIfNotExists()
    {
        return new Promise((resolve, reject) =>
        {
            this.sqlite
                .create({
                    name: this.name,
                    location: "default",
                })
                .then((db: SQLiteObject) =>
                {
                    this.data = db;
                    this.data
                        .executeSql(
                            `CREATE TABLE IF NOT EXISTS trainings (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        aufnahmeDate DATETIME NOT NULL,
                        trainingsType VARCHAR(50) NOT NULL,
                        interimLeinenAnlegen DOUBLE,
                        interimSaugleitungZuWasser DOUBLE,
                        interimAngesaugt DOUBLE NOT NULL,
                        interimSTFWasserMarsch DOUBLE,
                        interimATFWasserMarsch DOUBLE,
                        interimWTFWasserMarsch DOUBLE,
                        totalTime DOUBLE,
                        notes TEXT)`,
                            []
                        )
                        .then(() => resolve())
                        .catch((e) => reject(e));
                })
                .catch((e) => this.logger.error(e));
        });
    }

    public readTrainings()
    {
        return new Promise((resolve, reject) =>
        {
            this.data
                .executeSql(`SELECT * FROM trainings`, [])
                .then((data) =>
                {
                    resolve(data.rows);
                })
                .catch((e) => this.logger.error(e));
        });
    }

    public addTraining(training: Training)
    {
        return new Promise((resolve, reject) =>
        {
            this.data
                .executeSql(
                    `INSERT INTO 
                    trainings (
                        aufnahmeDate, 
                        trainingsType, 
                        interimLeinenAnlegen, 
                        interimSaugleitungZuWasser, 
                        interimAngesaugt, 
                        interimSTFWasserMarsch, 
                        interimATFWasserMarsch, 
                        interimWTFWasserMarsch, 
                        totalTime, 
                        notes
                    ) VALUES (
                        ?,?,?,?,?,?,?,?,?,?
                    )`,
                    [
                        training.recordDate,
                        training.trainingType,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        training.totalTime,
                        training.notes,
                    ]
                )
                .then(() =>
                {
                    training.id = this.data.last_insert_rowid();
                    resolve(training);
                })
                .catch((e) => this.logger.error(e));
        });
    }
}
