import { Injectable } from "@angular/core";
import { TrainingType } from "src/app/models/training-type/training-type";
import { Interim } from "src/app/models/interim/interim";

@Injectable({
    providedIn: "root",
})
export class SettingsService
{
    public interims: Array<any>;

    constructor()
    {
        this.interims = [
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
        ];
    }

    public getInterimsForTraingType(type: TrainingType): Array<Interim>
    {
        let interims = [];
        this.interims.forEach((interim) =>
        {
            if (interim.trainingTypes[type] == true)
                interims.push(new Interim(null, interim.name));
        });
        return interims;
    }
}
