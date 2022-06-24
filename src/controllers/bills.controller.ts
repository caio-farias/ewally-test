import { Request, Response } from 'express'
import * as BillsService from '../services/bills.services'

export const getBillData = async (req: Request, res: Response) => {
  const { barcode } = req.params
  const bill = BillsService.extractBillData(barcode)
  return res.json(bill)
}
