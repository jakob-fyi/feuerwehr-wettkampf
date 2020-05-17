export namespace Errors {
	export namespace Interims {
		export class NoNextInterimToTakeError extends Error {
			constructor(message?) {
				super();
				this.name = "NoNextInterimToTakeError";
				this.message =
					message ||
					"Ein Iterim liefert das Ergebnis false zurück. Wahrscheinlich wurde kein Name übergeben.";
			}
		}
	}
}
