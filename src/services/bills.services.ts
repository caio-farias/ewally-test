import {
	extractBarcodeAmount,
	extractBarcodeExpirationDate,
} from '../utils/barcodeDataExtraction.util'
import { Bill } from 'src/entity/bills.entity'

export const extractBillData = (barcode: string, digitsLineLength: number) => {
	const bill = { barcode } as Bill
	if (digitsLineLength === 48) {
		bill.amount = extractBarcodeAmount(barcode, 4, 14)
	} else {
		bill.expirationDate = extractBarcodeExpirationDate(barcode, 5, 9)
		bill.amount = extractBarcodeAmount(barcode, 9)
	}
	return bill
}
