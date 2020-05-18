import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root",
})
export class LoggerService
{
    constructor() { }

    public error(e)
    {
        console.log("ERROR: ", e);
    }
}
