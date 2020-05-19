import { Injectable } from "@angular/core";
import { TrainingType } from "src/app/models/training-type/training-type";
import { Interim } from "src/app/models/interim/interim";
import { ISettings } from 'src/app/interfaces/settings';
import { StorageService } from '../storage/storage.service';

@Injectable({
    providedIn: "root",
})
export class SettingsService
{
    public mySettings: ISettings = null;

    public constructor(public storage: StorageService)
    {
        this.storage.storageProvider.readSettings().then((data) =>
        {
            if (data == null)
            {
                this.mySettings = this.predefinedSettingsObject;
                this.storage.storageProvider.writeSettings(this.mySettings);
            }
            else
            {
                this.mySettings = data;
            }

        });
    }

    public save()
    {
        this.storage.storageProvider.writeSettings(this.mySettings);
    }

    public getInterimsForTraingType(type: TrainingType): Array<Interim>
    {
        let interims = [];
        this.mySettings.interims.forEach((interim) =>
        {
            if (interim.trainingTypes[type].setting == true)
            {
                interims.push(new Interim(null, interim.name));
            }
        });
        return interims;
    }

    public predefinedSettingsObject: ISettings = {
        interims: [
            {
                sortIndex: 10,
                name: "Leinen anlegen",
                trainingTypes: {
                    kuppeln: {
                        available: true,
                        setting: true
                    },
                    gesamt: {
                        available: true,
                        setting: true
                    }
                }
            },
            {
                sortIndex: 20,
                name: "Saugleitung zu Wasser",
                trainingTypes: {
                    kuppeln: {
                        available: true,
                        setting: true
                    },
                    gesamt: {
                        available: true,
                        setting: true
                    }
                }
            },
            {
                sortIndex: 30,
                name: "Angesaugt",
                trainingTypes: {
                    kuppeln: {
                        available: true,
                        setting: true
                    },
                    gesamt: {
                        available: true,
                        setting: true
                    }
                }
            },
            {
                sortIndex: 40,
                name: "STF Wasser marsch",
                trainingTypes: {
                    kuppeln: {
                        available: false,
                        setting: false
                    },
                    gesamt: {
                        available: true,
                        setting: true
                    }
                }
            }
        ]
    };
}
