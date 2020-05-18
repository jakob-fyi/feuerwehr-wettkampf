import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { LoggerService } from '../logger/logger.service';
import { Training } from 'src/app/models/training/training';

@Injectable({
    providedIn: 'root'
})
export class DatabaseService
{
    private db: any = null;
    private name: string = "feuerwehr_wettkampf.db"

    constructor(public platform: Platform, private sqlite: SQLite, public logger: LoggerService)
    {
        if (this.platform.is('cordova'))
        {
            this.sqlite.create(
            {
                name: this.name,
                location: 'default'
            })
            .then((db: SQLiteObject) => {
                this.db = db;
                this.createTables();
            })
            .catch(e => this.logger.error(e));
        } 
        else 
        {
            this.db = {
                executeSql: (str) => new Promise((resolve, reject) => {
                    console.log("executeSql", str);
                    resolve();
                }),
                transaction: (func) => func(this.db)
            };
            this.createTables();
        }
    }

    private createTables()
    {
        this.db.executeSql(
            `CREATE TABLE IF NOT EXISTS trainings (
                id INTEGER AUTOINCREMENT,
                aufnahmeDate DATETIME NOT NULL,
                trainingsType VARCHAR(50) NOT NULL
                interimLeinenAnlegen DOUBLE,
                interimSaugleitungZuWasser DOUBLE,
                interimAngesaugt DOUBLE NOT NULL,
                interimSTFWasserMarsch DOUBLE,
                interimATFWasserMarsch DOUBLE,
                interimWTFWasserMarsch DOUBLE,
                gesamtzeit DOUBLE,
                notes TEXT
            PRIMARY KEY(id)`, [])
        .then(() => console.log('Executed SQL'))
        .catch(e => this.logger.error(e));
    }

    public addTraining(training: Training)
    {
        this.db.transaction(
            (tx) => tx.executeSql(
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
                        gesamtzeit, 
                        notes
                    ) VALUES (
                        ?,?,?,?,?,?,?
                    )`, 
                [
                    training.recordDate,
                    training.trainingType
                ]
            )
        );
    }


}
