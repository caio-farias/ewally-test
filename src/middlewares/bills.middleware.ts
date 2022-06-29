import { NextFunction, Request, Response } from 'express'
import { enumErrorMessage } from '../utils/enums/errorMessages.enum'
import { enumHttpStatus } from '../utils/enums/statusCode.enum'
import HttpException from '../utils/httpException.util'

export const validateDigitsLineContent = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { digitsLine } = req.params
	const { billValidator, digitsLineLength } = req
	const isValid = billValidator.validateDigitsLineContent(digitsLine, digitsLineLength)

	if (!isValid)
		throw new HttpException(
			enumHttpStatus.BAD_REQUEST,
			enumErrorMessage.invalidBillContent
		)

	return next()
}

export const validateDigitsLineDV = (req: Request, res: Response, next: NextFunction) => {
	const { digitsLine } = req.params
	const { billValidator } = req
	const { isValid, barcode, validationError } =
		billValidator.validateDigitsLineDV(digitsLine)

	if (!isValid) throw new HttpException(enumHttpStatus.BAD_REQUEST, validationError)

	req.params.barcode = barcode
	return next()
}
