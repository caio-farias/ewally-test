import { enumDVIndex } from './validators/billValidator.interface'

export const convert48DigitsLineToBarcode = (digitsLine: string) => {
  const barcodeDV = +digitsLine[enumDVIndex._48digitsLine]
  const digitsLineDV =
    +`${digitsLine[11]}${digitsLine[23]}${digitsLine[35]}${digitsLine[47]}`
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

export const convert47DigitsLineToBarcode = (digitsLine: string) => {
  const init = digitsLine.slice(0, 4)
  const freeFieldPart1 = digitsLine.slice(4, 9)
  const firstDV = digitsLine[9]
  const freeFieldPart2 = digitsLine.slice(10, 20)
  const secondDV = digitsLine[20]
  const freeFieldPart3 = digitsLine.slice(21, 31)
  const thirdDV = digitsLine[31]
  const barcodeDV = digitsLine[32]
  const expirationDate = digitsLine.slice(33, 37)
  const billValue = digitsLine.slice(37, 47)
  const freeField = freeFieldPart1 + freeFieldPart2 + freeFieldPart3
  return {
    barcode: init + barcodeDV + expirationDate + billValue + freeField,
    digitsLineDV: +`${firstDV}${secondDV}${thirdDV}`,
    barcodeDV: +barcodeDV,
  }
}
