export enum enumDVIndex {
  _48digitsLine = 3,
  _47digitsLine = 4,
}

export abstract class IBillValidator {
  validateDigitsLineDV: Function
  validateDigitsLineContent: Function
}
