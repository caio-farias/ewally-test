import { NextFunction, Request, Response } from 'express'
import HttpException from '../../utils/HttpException'
import { enumErrorMessage } from '../../utils/enums/enumErrorsMessages'
import { enumHttpStatus } from '../../utils/enums/enumStatusCode'
import { IBillValidator } from './BillValidator'

export default class BillMiddleware {
  validateDigitsLineContent(
    req: Request,
    res: Response,
    next: NextFunction,
    billValidator: IBillValidator
  ) {
    const { digitsLine } = req.params
    const isValid = billValidator.validateDigitsLineContent(digitsLine)

    if (!isValid)
      throw new HttpException(
        enumHttpStatus.BAD_REQUEST,
        enumErrorMessage.invalidBillContent
      )

    return next()
  }

  validateDigitsLineDV(
    req: Request,
    res: Response,
    next: NextFunction,
    billValidator: IBillValidator
  ) {
    const { digitsLine } = req.params
    const { isValid, barcode } = billValidator.validateDigitsLineDV(digitsLine)

    if (!isValid)
      throw new HttpException(enumHttpStatus.BAD_REQUEST, enumErrorMessage.invalidBillDV)

    req.params.barcode = barcode
    return next()
  }
}
