import {
  validateDigitsLineContent,
  validateDigitsLineDV,
} from '../src/middlewares/bills.middleware'
import BankBillValidator from '../src/utils/validators/bankBill.validator'
import ConcessionarieBillValidator from '../src/utils/validators/concessionarieBill.validator'
import HttpException from '../src/utils/httpException.util'

const validBankBillParams = {
  req: {
    params: {
      digitsLine: '00190500954014481606906809350314337370000000100',
    },
  } as any,
  res: {} as any,
  next: jest.fn(),
}

const invalidContentBankBillParams = {
  invalidDigit: {
    req: {
      params: {
        digitsLine: 'A!0190500954014481606906809350314337370000000100',
      },
    } as any,
    res: {} as any,
    next: jest.fn(),
  },
  invalidLength: {
    req: {
      params: {
        digitsLine: 'A!0190500954014481606906809350314337370000000100',
      },
    } as any,
    res: {} as any,
    next: jest.fn(),
  },
  invalidDV: {
    req: {
      params: {
        digitsLine: '0190500954014481606906809350314737370000000100',
      },
    } as any,
    res: {} as any,
    next: jest.fn(),
  },
}

const validConcessionarieBillParams = {
  req: {
    params: {
      digitsLine: '846700000017435900240209024050002435842210108119',
    },
  } as any,
  res: {} as any,
  next: jest.fn(),
}

const invalidContentConcessionarieParams = {
  invalidDigit: {
    req: {
      params: {
        digitsLine: '84@700000017435900240209024050002435842210108119',
      },
    } as any,
    res: {} as any,
    next: jest.fn(),
  },
  invalidLength: {
    req: {
      params: {
        digitsLine: '1846700000017435900240209024050002435842210108119',
      },
    } as any,
    res: {} as any,
    next: jest.fn(),
  },
  invalidDV: {
    req: {
      params: {
        digitsLine: '846500000017435900240209024050002435842210108119',
      },
    } as any,
    res: {} as any,
    next: jest.fn(),
  },
}

const bankBillValidator = new BankBillValidator()
const concessionarieBillValidator = new ConcessionarieBillValidator()

describe.each([
  {
    validatorType: 'Bank',
    validator: bankBillValidator,
    validParams: validBankBillParams,
    invalidContentParams: invalidContentBankBillParams,
  },
  {
    validatorType: 'Concessionarie',
    validator: concessionarieBillValidator,
    validParams: validConcessionarieBillParams,
    invalidContentParams: invalidContentConcessionarieParams,
  },
])(
  'Test BillMiddleware',
  ({ validatorType, validator, validParams, invalidContentParams }) => {
    describe(`Test method validateDigitsLineContent (validator = ${validatorType})`, () => {
      test('should validate digits line, not throw error and call next() once', () => {
        const { req, res, next } = validParams
        try {
          validateDigitsLineContent(req, res, next, validator)
        } catch (error) {
          expect(error).toBeInstanceOf(HttpException)
        }
        expect(next).toHaveBeenCalledTimes(1)
      })

      test('should invalidate digits line (invalid digit) and throw error and not call next()', () => {
        const { req, res, next } = invalidContentParams.invalidDigit
        try {
          validateDigitsLineContent(req, res, next, validator)
        } catch (error) {
          expect(error).toBeInstanceOf(HttpException)
        }
        expect(next).toHaveBeenCalledTimes(0)
      })

      test('should invalidate digits line (invalid length) and throw error and not call next()', () => {
        const { req, res, next } = invalidContentParams.invalidLength
        try {
          validateDigitsLineContent(req, res, next, validator)
        } catch (error) {
          expect(error).toBeInstanceOf(HttpException)
        }
        expect(next).toHaveBeenCalledTimes(0)
      })
    })

    describe(`Test method validateDigitsLineDV (validator = ${validatorType})`, () => {
      test('should validate DV', () => {
        const { req, res, next } = validParams
        try {
          validateDigitsLineDV(req, res, next, validator)
        } catch (error) {
          expect(error).not.toBeInstanceOf(HttpException)
        }
        expect(next).toHaveBeenCalledTimes(1)
      })

      test('should invalidate DV', () => {
        const { req, res, next } = invalidContentParams.invalidDV
        try {
          validateDigitsLineDV(req, res, next, validator)
        } catch (error) {
          expect(error).toBeInstanceOf(HttpException)
        }
        expect(next).toHaveBeenCalledTimes(0)
      })
    })
  }
)
