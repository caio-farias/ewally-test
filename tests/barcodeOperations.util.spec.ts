import {
  extractBarcodeAmount,
  extractBarcodeExpirationDate,
} from '../src/utils/barcodeOperation.util'

describe('Test data extraction from barcode', () => {
  test('should extract barcode expirationDate: extractBarcodeExpirationDate()', () => {
    const barcode = '00193373700000001000500940144816060680935031'
    const expirationDate = '2007-12-31'
    expect(extractBarcodeExpirationDate(barcode)).toBe(expirationDate)
  })
  test('should extract barcode expirationDate extractBarcodeAmount()', () => {
    const barcode = '00193373700000023500500940144816060680935031'
    const amount = 23.5
    expect(extractBarcodeAmount(barcode)).toEqual(amount)
  })
})
