import IBillValidator from './billValidator.interface'
import { convert47DigitsLineToBarcode } from '../utils/digitsLine/digitsLineConversions.util'
import {
	DVCalculation,
	digitsLine47FieldsDVCalc,
} from '../utils/digitsLine/digitsLineDVCalc.util'
import { extractDvFromBarcode } from '../utils/barcodeDataExtraction.util'
import { isAllDigitsIntegers } from '../utils/digitsOperations.util'
import { enumDVIndex } from '../utils/enums/dvIndex.enum'
import { enumErrorMessage } from '../utils/enums/errorMessages.enum'

export default class BankBillValidator implements IBillValidator {
	digitsLineLength = 47
	mod11CustomModMapping = (remainderSumMod: number, mod: number) =>
		remainderSumMod === 0 || remainderSumMod === 10 || remainderSumMod == 11
			? '1'
			: (mod - remainderSumMod).toString()

	private DVCalc = (barcode: string): string =>
		DVCalculation(barcode, this.mod11CustomModMapping, false, 11)

	private digitsFieldDVCalc = (barcode: string): string =>
		digitsLine47FieldsDVCalc(barcode)

	validateDigitsLineDV(digitsLine: string) {
		const { barcode, digitsLineDV, barcodeDV } = convert47DigitsLineToBarcode(digitsLine)
		const barcodeWithoutDV = extractDvFromBarcode(barcode, enumDVIndex._47digitsLine)
		const calculatedBarcodeDV = this.DVCalc(barcodeWithoutDV)
		const calculatedDigitsLineDV = this.digitsFieldDVCalc(digitsLine)

		const validationError = this.generateDVValidationErrorMessage(
			digitsLineDV,
			calculatedDigitsLineDV,
			barcodeDV,
			calculatedBarcodeDV
		)

		return {
			isValid: validationError === null,
			barcode,
			validationError,
		}
	}

	validateDigitsLineContent(digitsLine: string, digitsLineLength: number): boolean {
		if (digitsLineLength != this.digitsLineLength) return false
		if (!isAllDigitsIntegers(digitsLine)) return false
		return true
	}

	private generateDVValidationErrorMessage(
		digitsLineDV: string,
		calculatedDigitsLineDV: string,
		barcodeDV: string,
		calculatedBarcodeDV: string
	) {
		if (digitsLineDV !== calculatedDigitsLineDV) {
			return (
				enumErrorMessage.invalidBillBarcodeDV +
				` Your digitsLine has DVs equal ${digitsLineDV}, ` +
				`but it should be ${calculatedDigitsLineDV}.`
			)
		}
		if (barcodeDV !== calculatedBarcodeDV) {
			return (
				enumErrorMessage.invalidBillBarcodeDV +
				` Your barcode has DV equal ${barcodeDV}, but it should be ${calculatedBarcodeDV}.`
			)
		}
		return null
	}
}
