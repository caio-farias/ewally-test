import ConcessionarieValidator from '../src/utils/validators/concessionarieBill.validator'

const concessionarieBillMock = {
  validDigitsLine: '846700000017435900240209024050002435842210108119',
  barcode: '84670000001435900240200240500024384221010811',
  invalidDigitsLine: {
    differentDV: '846500000017435900240209024050002435842210108119',
    differentLength: '12846700000017435900240209024050002435842210108119',
    differentContent: 'T846700000017435900240209024050002435842210108119',
  },
}

const consseionarieBillValidator = new ConcessionarieValidator()

describe('Test ConsseionarieBillValidator', () => {
  const { validDigitsLine, invalidDigitsLine, barcode } = concessionarieBillMock
  const { differentContent, differentDV, differentLength } = invalidDigitsLine

  describe('Test validateDigitsLineWithDVContent method', () => {
    test('should check DigitsLine content and return true', () => {
      expect(consseionarieBillValidator.validateDigitsLineContent(validDigitsLine)).toBe(
        true
      )
    })

    test('should check digitsLine with wrong content and return false', () => {
      expect(consseionarieBillValidator.validateDigitsLineContent(differentContent)).toBe(
        false
      )
    })

    test('should check digitsLine content with wrong length and return false', () => {
      expect(consseionarieBillValidator.validateDigitsLineContent(differentLength)).toBe(
        false
      )
    })
  })
  describe('Test validateDigitsLineDV method', () => {
    test('should validate digitsLine DV', () => {
      expect(consseionarieBillValidator.validateDigitsLineDV(validDigitsLine)).toEqual(
        expect.objectContaining({
          isValid: true,
          barcode,
        })
      )
    })
    test('should invalidate digitsLine DV', () => {
      expect(
        consseionarieBillValidator.validateDigitsLineDV(invalidDigitsLine.differentDV)
      ).not.toEqual(
        expect.objectContaining({
          isValid: true,
          barcode,
        })
      )
    })
  })
})
