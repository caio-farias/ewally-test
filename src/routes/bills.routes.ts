import { Request, Response, Router } from 'express'
import { asyncHandler } from '../utils/handlers/async.handler'
import { injectValidatorHandler } from '../utils/handlers/injectValidator.handler'
import {
  validateDigitsLineContent,
  validateDigitsLineDV,
} from '../middlewares/bills.middleware'
import { getBillDataController } from '../controllers/bills.controller'

const router = Router()

router.get(
  '/bills/:digitsLine',
  [
    injectValidatorHandler(validateDigitsLineContent),
    injectValidatorHandler(validateDigitsLineDV),
  ],
  asyncHandler((req: Request, res: Response) => getBillDataController(req, res))
)

export default router
