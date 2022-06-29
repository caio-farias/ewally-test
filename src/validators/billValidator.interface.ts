interface ValidationResult {
	isValid: boolean
	barcode: string
	validationError: string
}

export default interface IBillValidator {
	validateDigitsLineDV(digitsLine: string): ValidationResult
	validateDigitsLineContent(digitsLine: string, digitsLineLength: number): boolean
}
