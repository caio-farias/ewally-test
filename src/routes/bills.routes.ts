import { Request, Response, Router } from 'express'
import { asyncHandler } from '../utils/handlers/async.handler'
import { defineValidator } from '../utils/handlers/injectValidator.handler'
import * as BillsMiddleware from '../middlewares/bills.middleware'
import * as BillsController from '../controllers/bills.controller'

const router = Router()

router.get(
	'/bills/:digitsLine',
	[
		defineValidator,
		BillsMiddleware.validateDigitsLineContent,
		BillsMiddleware.validateDigitsLineDV,
	],
	asyncHandler((req: Request, res: Response) => BillsController.getBillData(req, res))
)

export default router
