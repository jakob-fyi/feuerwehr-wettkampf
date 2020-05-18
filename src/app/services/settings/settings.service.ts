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
                    kuppeln: true,
                    gesamt: true,
                },
            },
            {
                sortIndex: 20,
                name: "Saugleitung zu Wasser",
                trainingTypes: {
                    kuppeln: true,
                    gesamt: true,
                },
            },
            {
                sortIndex: 30,
                name: "Angesaugt",
                trainingTypes: {
                    kuppeln: true,
                    gesamt: true,
                },
            },
            {
                sortIndex: 40,
                name: "STF Wasser marsch",
                trainingTypes: {
                    kuppeln: false,
                    gesamt: true,
                },
            },
            {
                sortIndex: 50,
                name: "STF Wasser marsch",
                trainingTypes: {
                    kuppeln: false,
                    gesamt: true,
                },
            },
            {
                sortIndex: 60,
                name: "STF Wasser marsch",
                trainingTypes: {
                    kuppeln: false,
                    gesamt: true,
                },
            },
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
