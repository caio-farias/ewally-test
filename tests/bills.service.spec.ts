import { extractBillData } from '../src/services/bills.services'

const barcode = '00193373700000001000500940144816060680935031'
const bill = {
  barcode,
  amount: 1.0,
  expirationDate: '2007-12-31',
}
describe('Test Bill Service', () => {
  test('should respond a valid bill object', () => {
    expect(extractBillData(barcode)).toEqual(expect.objectContaining(bill))
  })
})
