/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	validateDigitsLineContent,
	validateDigitsLineDV,
} from '../src/middlewares/bills.middleware'
import BankBillValidator from '../src/validators/bankBill.validator'
import ConcessionarieBillValidator from '../src/validators/concessionarieBill.validator'
import HttpException from '../src/utils/httpException.util'

const bankBillValidator = new BankBillValidator()
const concessionarieBillValidator = new ConcessionarieBillValidator()

const validBankBillParams = {
	req: {
		billValidator: bankBillValidator,
		digitsLineLength: 47,
		params: {
			digitsLine: '00190500954014481606906809350314337370000000100',
		},
	},
	res: {} as any,
	next: jest.fn(),
}

const invalidContentBankBillParams = {
	invalidDigit: {
		req: {
			billValidator: bankBillValidator,
			digitsLineLength: 47,
			params: {
				digitsLine: 'X0190500954014481606906809350314337370000000100',
			},
		} as any,
		res: {} as any,
		next: jest.fn(),
	},
	invalidLength: {
		req: {
			params: {
				digitsLine: '120190500954014481606906809350314337370000000100',
			},
			billValidator: bankBillValidator,
			digitsLineLength: '120190500954014481606906809350314337370000000100'.length,
		} as any,
		res: {} as any,
		next: jest.fn(),
	},
	invalidDV: {
		req: {
			billValidator: bankBillValidator,
			digitsLineLength: 47,
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
		billValidator: concessionarieBillValidator,
		digitsLineLength: 48,
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
			billValidator: concessionarieBillValidator,
			digitsLineLength: 48,
			params: {
				digitsLine: '84@700000017435900240209024050002435842210108119',
			},
		} as any,
		res: {} as any,
		next: jest.fn(),
	},
	invalidLength: {
		req: {
			billValidator: concessionarieBillValidator,
			digitsLineLength: '1846700000017435900240209024050002435842210108119'.length,
			params: {
				digitsLine: '1846700000017435900240209024050002435842210108119',
			},
		} as any,
		res: {} as any,
		next: jest.fn(),
	},
	invalidDV: {
		req: {
			billValidator: concessionarieBillValidator,
			digitsLineLength: 48,
			params: {
				digitsLine: '846500000017435900240209024050002435842210108119',
			},
		} as any,
		res: {} as any,
		next: jest.fn(),
	},
}
describe.each([
	{
		validatorType: bankBillValidator.constructor.name,
		validParams: validBankBillParams,
		invalidContentParams: invalidContentBankBillParams,
	},
	{
		validatorType: concessionarieBillValidator.constructor.name,
		validParams: validConcessionarieBillParams,
		invalidContentParams: invalidContentConcessionarieParams,
	},
])('Test BillMiddleware', ({ validatorType, validParams, invalidContentParams }) => {
	describe(`Test method validateDigitsLineContent (validator = ${validatorType})`, () => {
		test('should validate digits line, not throw error and call next() once', () => {
			const { req, res, next } = validParams
			try {
				validateDigitsLineContent(req, res, next)
			} catch (error) {
				expect(error).not.toBeInstanceOf(HttpException)
			}
			expect(next).toHaveBeenCalledTimes(1)
		})

		test('should invalidate digits line (invalid digit) and throw error and not call next()', () => {
			const { req, res, next } = invalidContentParams.invalidDigit
			try {
				validateDigitsLineContent(req, res, next)
			} catch (error) {
				expect(error).toBeInstanceOf(HttpException)
			}
			expect(next).toHaveBeenCalledTimes(0)
		})

		test('should invalidate digits line (invalid length) and throw error and not call next()', () => {
			const { req, res, next } = invalidContentParams.invalidLength
			try {
				validateDigitsLineContent(req, res, next)
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
				validateDigitsLineDV(req, res, next)
			} catch (error) {
				expect(error).not.toBeInstanceOf(HttpException)
			}
			expect(next).toHaveBeenCalledTimes(1)
		})

		test('should invalidate DV', () => {
			const { req, res, next } = invalidContentParams.invalidDV
			try {
				validateDigitsLineDV(req, res, next)
			} catch (error) {
				expect(error).toBeInstanceOf(HttpException)
			}
			expect(next).toHaveBeenCalledTimes(0)
		})
	})
})
