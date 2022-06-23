abstract class IBillValidator {
  validateDigitsLineDV: Function
  validateDigitsLineContent: Function
}

interface BarcodeInfo {
  isValid: boolean
  barcode: string
}

export { IBillValidator, BarcodeInfo }
