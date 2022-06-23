import { Request, Response, Router } from 'express'
import BillMiddleware from './BillMiddleware'
import BillController from './BillController'
import { asyncHandler } from '../../utils/hadlers/asyncHandler'
import { injectValidatorHandler } from '../../utils/hadlers/injectValidatorHandler'

const router = Router()

const bankBillMiddleware = new BillMiddleware()

router.get(
  '/bills/:digitsLine',
  [
    injectValidatorHandler(bankBillMiddleware.validateDigitsLineContent),
    injectValidatorHandler(bankBillMiddleware.validateDigitsLineDV),
  ],
  asyncHandler((req: Request, res: Response) =>
    new BillController().getBillData(req, res)
  )
)

export default router
