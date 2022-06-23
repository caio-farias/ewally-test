import { IBillValidator } from '../BillValidator'
import { commonDVCalculation, digitsFieldDVCalc, isAllDigitsIntegers } from '../utils'

export default class ConcessionarieBillValidator implements IBillValidator {
  private readonly digitsLineLength = 48
  private readonly DVIndex = 3
  private readonly mod10FactorSequence = [2, 1]
  private readonly mod11FactorSequence = [2, 3, 4, 5, 6, 7, 8, 9]
  private readonly mod10CustomModMapping = (remainderSumMod: number, mod: number) =>
    remainderSumMod === 0 ? 0 : mod - remainderSumMod
  private readonly mod11CustomModMapping = (remainderSumMod: number, mod: number) => {
    if (remainderSumMod === 0 || remainderSumMod == 1) return 0
    if (remainderSumMod === 10) return 1
    return mod - remainderSumMod
  }

  validateDigitsLineDV(digitsLine: string) {
    let calculatedBarcodeDV
    const { barcode, digitsLineDV, barcodeDV } = this.mapDigitsLineToBarcode(digitsLine)
    const barcodeWithoutDV = this.generateBarcodeWithouDV(barcode)

    if (this.shouldUseMod11DVCalc(barcode))
      calculatedBarcodeDV = this.DVCalcMod11(barcodeWithoutDV)
    else calculatedBarcodeDV = this.DVCalcMod10(barcodeWithoutDV)

    return {
      isValid: calculatedBarcodeDV === barcodeDV,
      barcode,
    }
  }

  validateDigitsLineContent(digitsLine: string): boolean {
    if (digitsLine.length != this.digitsLineLength) return false
    if (!isAllDigitsIntegers(digitsLine)) return false
    return true
  }

  private mapDigitsLineToBarcode = (digitsLine: string) => {
    const barcodeDV = +digitsLine[this.DVIndex]
    const digitsLineDV = `${digitsLine[11]}${digitsLine[23]}${digitsLine[35]}${digitsLine[47]}`
    const barcode =
      digitsLine.slice(0, 11) +
      digitsLine.slice(12, 23) +
      digitsLine.slice(24, 35) +
      digitsLine.slice(36, 47)
    return {
      barcode,
      digitsLineDV,
      barcodeDV,
    }
  }

  private generateBarcodeWithouDV = (barcode: string) =>
    barcode.slice(0, this.DVIndex) + barcode.slice(this.DVIndex + 1)

  private DVCalcMod11 = (barcode: string): number =>
    commonDVCalculation(
      barcode,
      this.mod11FactorSequence,
      11,
      true,
      this.mod11CustomModMapping
    )

  private DVCalcMod10 = (barcode: string): number =>
    commonDVCalculation(
      barcode,
      this.mod10FactorSequence,
      10,
      true,
      this.mod10CustomModMapping
    )

  private digitsFieldDVCalc = (barcode: string): number =>
    commonDVCalculation(
      barcode,
      this.mod10FactorSequence,
      10,
      true,
      this.mod10CustomModMapping
    )

  private shouldUseMod11DVCalc = (barcode: string): boolean =>
    +barcode[this.DVIndex - 1] > 7
}
