import { Request, Response } from 'express'
import { extractBillData } from './BillService'

export default class BillController {
  async getBillData(req: Request, res: Response) {
    const { barcode } = req.params
    const bill = extractBillData(barcode)
    return res.json(bill)
  }
}
