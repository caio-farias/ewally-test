import {
	generateFactors,
	roundUpTensDigit,
	sumDigits,
} from '../src/utils/digitsOperations.util'

describe('Test main digits operations functions', () => {
	describe('sumDigits()', () => {
		test('should sum of barcode digits with spectial case (18 = 1+8)', () => {
			const barcode = '0680935031'
			const sumBarcode = 36
			expect(sumDigits(barcode)).toBe(sumBarcode)
		})
	})
	describe('roundUpTensDigit', () => {
		test('should round up tens digits of numbers', () => {
			const num = 36
			const roundedUpNum = 40
			expect(roundUpTensDigit(num)).toBe(roundedUpNum)
		})
	})
	describe('generateFacors', () => {
		test('should generate sequence of factors', () => {
			const factorSequence = [2, 3, 4, 5, 6, 7, 8, 9]
			const factorSequenceSize = 10
			expect(generateFactors(factorSequence, factorSequenceSize)).toEqual([
				2, 3, 4, 5, 6, 7, 8, 9, 2, 3,
			])
		})
	})
})
