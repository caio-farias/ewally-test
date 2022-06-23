import { extractBillData } from './BillService'

const barcode = '858900000204000003281833240720183105618666712531'
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
