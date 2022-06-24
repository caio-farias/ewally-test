import { Request, Response, Router } from 'express'
import { asyncHandler } from '../utils/handlers/async.handler'
import { injectValidatorHandler } from '../utils/handlers/injectValidator.handler'
import * as BillsMiddleware from '../middlewares/bills.middleware'
import * as BillsController from '../controllers/bills.controller'

const router = Router()

router.get(
  '/bills/:digitsLine',
  [
    injectValidatorHandler(BillsMiddleware.validateDigitsLineContent),
    injectValidatorHandler(BillsMiddleware.validateDigitsLineDV),
  ],
  asyncHandler((req: Request, res: Response) => BillsController.getBillData(req, res))
)

export default router
