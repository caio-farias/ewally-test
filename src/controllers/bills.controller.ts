import { Request, Response } from 'express'
import { extractBillDataService } from '../services/bills.services'

export const getBillDataController = async (req: Request, res: Response) => {
  const { barcode } = req.params
  const bill = extractBillDataService(barcode)
  return res.json(bill)
}
