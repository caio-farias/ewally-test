import { enumDVIndex, IBillValidator } from './billValidator.interface'
import { convert47DigitsLineToBarcode } from '../digitsLineConversion.util'
import { DVCalculation, digitsLine47FieldsDVCalc } from '../verificationDigitsCalc.util'
import { extractDvFromBarcode } from '../barcodeOperation.util'
import { isAllDigitsIntegers } from '../digitsOperations.util'

export default class BankBillValidator implements IBillValidator {
  digitsLineLength = 47
  mod11CustomModMapping = (remainderSumMod: number, mod: number) =>
    remainderSumMod === 0 || remainderSumMod === 10 || remainderSumMod == 11
      ? 1
      : mod - remainderSumMod

  private DVCalc = (barcode: string): number =>
    DVCalculation(barcode, this.mod11CustomModMapping, false, 11)

  private digitsFieldDVCalc = (barcode: string): number =>
    digitsLine47FieldsDVCalc(barcode)

  validateDigitsLineDV(digitsLine: string) {
    const { barcode, digitsLineDV, barcodeDV } = convert47DigitsLineToBarcode(digitsLine)
    const barcodeWithoutDV = extractDvFromBarcode(barcode, enumDVIndex._47digitsLine)
    const calculatedBarcodeDV = this.DVCalc(barcodeWithoutDV)
    const calculatedDigitsLineDV = this.digitsFieldDVCalc(digitsLine)
    return {
      isValid:
        calculatedBarcodeDV === barcodeDV && digitsLineDV === calculatedDigitsLineDV,
      barcode,
    }
  }

  validateDigitsLineContent(digitsLine: string): boolean {
    if (digitsLine.length != this.digitsLineLength) return false
    if (!isAllDigitsIntegers(digitsLine)) return false
    return true
  }
}
