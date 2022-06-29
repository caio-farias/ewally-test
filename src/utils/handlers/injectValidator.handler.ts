import { NextFunction, Request, Response } from 'express'
import BankBillValidator from '../../validators/bankBill.validator'
import ConcessionarieBillValidator from '../../validators/concessionarieBill.validator'

const concessionaireBillValidator = new ConcessionarieBillValidator()
const bankBillValidator = new BankBillValidator()

export const defineValidator = (req: Request, res: Response, next: NextFunction) => {
	const { digitsLine } = req.params
	const digitsLineLength = digitsLine.length
	if (digitsLineLength === 48) {
		req.digitsLineLength = digitsLineLength
		req.billValidator = concessionaireBillValidator
	} else {
		req.digitsLineLength = digitsLineLength
		req.billValidator = bankBillValidator
	}
	return next()
}
