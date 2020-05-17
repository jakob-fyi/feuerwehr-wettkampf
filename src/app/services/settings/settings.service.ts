import { Injectable } from "@angular/core";

@Injectable({
	providedIn: "root"
})
export class SettingsService {
	public interims: Array<any>;

	constructor() {
		this.interims = [
			{
				id: 1,
				sortIndex: 10,
				name: "Leinen anlegen",
				trainingTypes: {
					kuppeln: true,
					geamt: true
				}
			},
			{
				id: 2,
				sortIndex: 20,
				name: "Saugleitung zu Wasser",
				trainingTypes: {
					kuppeln: true,
					geamt: true
				}
			},
			{
				id: 3,
				sortIndex: 30,
				name: "Angesaugt",
				trainingTypes: {
					kuppeln: true,
					geamt: true
				}
			},
			{
				id: 4,
				sortIndex: 40,
				name: "STF Wasser marsch",
				trainingTypes: {
					kuppeln: false,
					geamt: true
				}
			},
			{
				id: 5,
				sortIndex: 50,
				name: "STF Wasser marsch",
				trainingTypes: {
					kuppeln: false,
					geamt: true
				}
			},
			{
				id: 6,
				sortIndex: 60,
				name: "STF Wasser marsch",
				trainingTypes: {
					kuppeln: false,
					geamt: true
				}
			}
		];
	}
}
