import { Request, Response } from 'express'
import * as BillsService from '../services/bills.services'

export const getBillData = async (req: Request, res: Response) => {
	const { barcode } = req.params
	const { digitsLineLength } = req
	const bill = BillsService.extractBillData(barcode, digitsLineLength)
	return res.json(bill)
}
