import { Bill } from '../../entity/Bill'
import { calculateBarcodeAmount, calculateBarcodeExpirationDate } from './utils'

export const extractBillData = (barcode: string) => {
  const amount = calculateBarcodeAmount(barcode)
  const expirationDate = calculateBarcodeExpirationDate(barcode)
  const bill = { barcode, amount, expirationDate } as Bill
  return bill
}
