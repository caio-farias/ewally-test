import {
	extractBarcodeAmount,
	extractBarcodeExpirationDate,
} from '../src/utils/barcodeDataExtraction.util'

describe('Test data extraction from barcode', () => {
	test('should extract barcode expirationDate: extractBarcodeExpirationDate()', () => {
		const barcode = '00193373700000001000500940144816060680935031'
		const expirationDate = '2007-12-31'
		expect(extractBarcodeExpirationDate(barcode, 5, 9)).toBe(expirationDate)
	})
	test('should extract barcode expirationDate: extractBarcodeExpirationDate()', () => {
		const barcode = '00193100100000001000500940144816060680935031'
		const expirationDate = '2000-07-04'
		expect(extractBarcodeExpirationDate(barcode, 5, 9)).toBe(expirationDate)
	})

	test('should extract barcode expirationDate extractBarcodeAmount()', () => {
		const barcode = '00193373700000023500500940144816060680935031'
		const amount = '23.50'
		expect(extractBarcodeAmount(barcode, 9)).toEqual(amount)
	})
})
