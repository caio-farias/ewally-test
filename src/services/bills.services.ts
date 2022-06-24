import {
  extractBarcodeAmount,
  extractBarcodeExpirationDate,
} from '../utils/barcodeOperation.util'
import { Bill } from 'src/entity/bills.entity'

export const extractBillData = (barcode: string) => {
  const bill = { barcode } as Bill
  bill.amount = extractBarcodeAmount(barcode)
  bill.expirationDate = extractBarcodeExpirationDate(barcode)
  return bill
}
