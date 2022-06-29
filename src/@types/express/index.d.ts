import 'express'

declare global {
  namespace Express {
    export interface Request {
      digitsLineLength: number
      billValidator: IBillValidator
    }
  }
}
