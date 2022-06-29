import IBillValidator from './billValidator.interface'
import { isAllDigitsIntegers } from '../utils/digitsOperations.util'
import { convert48DigitsLineToBarcode } from '../utils/digitsLine/digitsLineConversions.util'
import {
	digitsLine48FieldsDVCalc,
	DVCalculation,
} from '../utils/digitsLine/digitsLineDVCalc.util'
import { extractDvFromBarcode } from '../utils/barcodeDataExtraction.util'
import { enumDVIndex } from '../utils/enums/dvIndex.enum'
import { enumErrorMessage } from '../utils/enums/errorMessages.enum'

export default class ConcessionarieBillValidator implements IBillValidator {
	digitsLineLength = 48
	mod10CustomModMapping = (remainderSumMod: number, mod: number) =>
		remainderSumMod === 0 ? '0' : (mod - remainderSumMod).toString()
	mod11CustomModMapping = (remainderSumMod: number, mod: number) => {
		if (remainderSumMod === 0 || remainderSumMod == 1) return '0'
		if (remainderSumMod === 10) return '1'
		return (mod - remainderSumMod).toString()
	}

	private shouldUseMod11DVCalc = (barcode: string): boolean =>
		+barcode[enumDVIndex._48digitsLine - 1] > 7

	validateDigitsLineDV(digitsLine: string) {
		let calculatedBarcodeDV: string
		let calculatedDigitsLineDV: string
		const { barcode, digitsLineDV, barcodeDV } = convert48DigitsLineToBarcode(digitsLine)
		const barcodeWithoutDV = extractDvFromBarcode(barcode, enumDVIndex._48digitsLine)

		if (this.shouldUseMod11DVCalc(barcode)) {
			calculatedBarcodeDV = DVCalculation(barcodeWithoutDV, undefined, true, 11)
			calculatedDigitsLineDV = digitsLine48FieldsDVCalc(
				digitsLine,
				this.mod11CustomModMapping
			)
		} else {
			calculatedBarcodeDV = DVCalculation(barcodeWithoutDV, this.mod10CustomModMapping)
			calculatedDigitsLineDV = digitsLine48FieldsDVCalc(
				digitsLine,
				this.mod10CustomModMapping
			)
		}
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
				`where it should be ${calculatedDigitsLineDV}.`
			)
		} else if (barcodeDV !== calculatedBarcodeDV) {
			return (
				enumErrorMessage.invalidBillBarcodeDV +
				` Your barcode has DV equal ${barcodeDV}, where it should be ${calculatedBarcodeDV}.`
			)
		}
		return null
	}
}
