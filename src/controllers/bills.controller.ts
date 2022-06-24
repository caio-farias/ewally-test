import { Request, Response } from 'express'
import { extractBillData } from '../services/bills.services'

export const getBillData = async (req: Request, res: Response) => {
  const { barcode } = req.params
  const bill = extractBillData(barcode)
  return res.json(bill)
}
