import { Response, Request, NextFunction } from 'express'
import { enumHttpStatus } from '../enums/enumStatusCode'
import HttpException from '../HttpException'

export const errorHandler = (
  err: any,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (err instanceof HttpException)
    return response.status(err.status).send({
      message: err.message,
    })
  console.error(err)
  return response.status(enumHttpStatus.INTERNAL_SERVER_ERROR).send({
    message: err.message,
  })
}
