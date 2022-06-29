import {
	convert47DigitsLineToBarcode,
	convert48DigitsLineToBarcode,
} from '../src/utils/digitsLine/digitsLineConversions.util'

describe('Test digitsLine --> barcode cases: ', () => {
	test('should convert digitsLine to barcode (47 digits)', () => {
		const digitsLine = '00190500954014481606906809350314337370000000100'
		const barcode = '00193373700000001000500940144816060680935031'
		const digitsLineDV = '594'
		const barcodeDV = '3'
		expect(convert47DigitsLineToBarcode(digitsLine)).toEqual(
			expect.objectContaining({
				barcode,
				digitsLineDV,
				barcodeDV,
			})
		)
	})
	test('should convert digitsLine to barcode (48 digits)', () => {
		const digitsLine = '846700000017435900240209024050002435842210108119'
		const barcode = '84670000001435900240200240500024384221010811'
		const digitsLineDV = '7959'
		const barcodeDV = '7'
		expect(convert48DigitsLineToBarcode(digitsLine)).toEqual(
			expect.objectContaining({
				barcode,
				digitsLineDV,
				barcodeDV,
			})
		)
	})
})
