import { IBillValidator } from '../BillValidator'
import {
  commonDVCalculation,
  digitsFieldDVCalc,
  isAllDigitsIntegers,
  mapDigitsLineToBarcode,
} from '../utils'

export default class BankBillValidator implements IBillValidator {
  private readonly digitsLineLength = 47
  private readonly mod11FactorSequence = [2, 3, 4, 5, 6, 7, 8, 9]
  private readonly DVIndex = 4
  private readonly mod11CustomModMapping = (remainderSumMod: number, mod: number) => {
    if (remainderSumMod === 0 || remainderSumMod === 10 || remainderSumMod == 11) return 1
    return mod - remainderSumMod
  }

  validateDigitsLineDV(digitsLine: string) {
    const { barcode, digitsLineDV, barcodeDV } = this.mapDigitsLineToBarcode(digitsLine)
    const barcodeWithoutDV = this.generateBarcodeWithouDV(barcode)
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

  private mapDigitsLineToBarcode = (digitsLine: string) =>
    mapDigitsLineToBarcode(digitsLine)

  private generateBarcodeWithouDV = (barcode: string) =>
    barcode.slice(0, this.DVIndex) + barcode.slice(this.DVIndex + 1)

  private DVCalc = (barcode: string): number =>
    commonDVCalculation(
      barcode,
      this.mod11FactorSequence,
      11,
      false,
      this.mod11CustomModMapping
    )

  private digitsFieldDVCalc = (barcode: string): string => digitsFieldDVCalc(barcode)
}
