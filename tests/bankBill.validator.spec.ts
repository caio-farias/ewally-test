import BankBillValidator from '../src/validators/bankBill.validator'

const bankBillMock = {
	validDigitsLine: '00190500954014481606906809350314337370000000100',
	barcode: '00193373700000001000500940144816060680935031',
	// DV: 3,
	invalidDigitsLine: {
		differentDV: '00190500954014481606906809350314837370000000100',
		differentLength: '12300190500954014481606906809350314337370000000100',
		differentContent: 'T190500954014481606906809350314337370000000100',
	},
}

const bankBillValidator = new BankBillValidator()

describe('Test BankBillValidator', () => {
	const { validDigitsLine, invalidDigitsLine, barcode } = bankBillMock
	const { differentContent, differentLength } = invalidDigitsLine

	describe('Test validateDigitsLineWithDVContent method', () => {
		test('should check DigitsLine content and return true', () => {
			expect(
				bankBillValidator.validateDigitsLineContent(
					validDigitsLine,
					validDigitsLine.length
				)
			).toBe(true)
		})

		test('should check digitsLine with wrong content and return false', () => {
			expect(
				bankBillValidator.validateDigitsLineContent(
					differentContent,
					differentContent.length
				)
			).toBe(false)
		})

		test('should check digitsLine content with wrong length and return false', () => {
			expect(
				bankBillValidator.validateDigitsLineContent(
					differentLength,
					differentLength.length
				)
			).toBe(false)
		})
	})
	describe('Test validateDigitsLineDV method', () => {
		test('should validate digitsLine DV', () => {
			expect(bankBillValidator.validateDigitsLineDV(validDigitsLine)).toEqual(
				expect.objectContaining({
					isValid: true,
					barcode,
				})
			)
		})
		test('should invalidate digitsLine DV', () => {
			expect(
				bankBillValidator.validateDigitsLineDV(invalidDigitsLine.differentDV)
			).not.toEqual(
				expect.objectContaining({
					isValid: true,
					barcode,
				})
			)
		})
	})
})
