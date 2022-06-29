import * as BillsService from '../src/services/bills.services'

const bankBillData = {
	barcode: '00193373700000001000500940144816060680935031',
	amount: '1.00',
	expirationDate: '2007-12-31',
}

const concessionarieBillData = {
	barcode: '846700000017435900240209024050002435842210108119',
	amount: '17.43',
}

describe.each([
	{ type: 'bankBillData', billData: bankBillData },
	{ type: 'concessionarieBillDat`', billData: concessionarieBillData },
])('Test Bill Service', ({ type, billData }) => {
	test(`should respond a valid bill object (${type})`, () => {
		const { barcode } = billData
		expect(BillsService.extractBillData(barcode, barcode.length)).toEqual(billData)
	})
})
