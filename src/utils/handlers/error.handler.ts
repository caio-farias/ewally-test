import { Response, Request, NextFunction } from 'express'
import { enumHttpStatus } from '../enums/statusCode.enum'
import HttpException from '../httpException.util'

export const errorHandler = (
	err: any,
	request: Request,
	response: Response,
	next: NextFunction
) => {
	if (err instanceof HttpException)
		return response.status(err.status).send({
			message: err.message,
			// stack: err.stack,
		})
	if (err instanceof Error)
		return response.status(enumHttpStatus.INTERNAL_SERVER_ERROR).send({
			message: err.message,
			// stack: err.stack,
		})
	return next()
}
