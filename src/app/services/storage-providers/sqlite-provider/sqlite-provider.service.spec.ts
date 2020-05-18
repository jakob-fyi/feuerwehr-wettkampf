import { TestBed } from "@angular/core/testing";

import { SQLiteProviderService } from "./sqlite-provider.service";

describe("SQLiteProviderService", () =>
{
    beforeEach(() => TestBed.configureTestingModule({}));

    it("should be created", () =>
    {
        const service: SQLiteProviderService = TestBed.get(SQLiteProviderService);
        expect(service).toBeTruthy();
    });
});
