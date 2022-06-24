import { NextFunction, Request, Response } from 'express'
import BankBillValidator from '../validators/bankBill.validator'
import ConcessionarieBillValidator from '../validators/concessionarieBill.validator.util'

const concessionaireBillValidator = new ConcessionarieBillValidator()
const bankBillValidator = new BankBillValidator()

const defineValidator = (req: Request, res: Response) => {
  const { digitsLine } = req.params
  if (digitsLine[0] === '8') return concessionaireBillValidator
  return bankBillValidator
}

export const injectValidatorHandler =
  (func: Function) => (request: Request, response: Response, next: NextFunction) => {
    const validator = defineValidator(request, response)
    func(request, response, next, validator)
  }
