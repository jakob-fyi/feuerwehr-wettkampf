export class Interim {
	public name: string;
	public time: number;

	public get taken() {
		return this.time > 0 ? true : false;
	}

	constructor(_time: number, _name?: string) {
		this.name = _name ? _name : "Zwischnzeit";
		this.time = _time;
	}
}
