import { Request, Response, Router } from 'express'
import { asyncHandler } from '../utils/hadlers/async.handler'
import { injectValidatorHandler } from '../utils/hadlers/injectValidator.handler'
import {
  validateDigitsLineContent,
  validateDigitsLineDV,
} from '../middlewares/bills.middleware'
import { getBillData } from '../controllers/bills.controller'

const router = Router()

router.get(
  '/bills/:digitsLine',
  [
    injectValidatorHandler(validateDigitsLineContent),
    injectValidatorHandler(validateDigitsLineDV),
  ],
  asyncHandler((req: Request, res: Response) => getBillData(req, res))
)

export default router
