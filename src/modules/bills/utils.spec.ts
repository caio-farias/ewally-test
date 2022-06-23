import {
  roundUpTensDigit,
  sumBarcodeDigits,
  generateFactors,
  commonDVCalculation,
  mapDigitsLineToBarcode,
  calculateBarcodeExpirationDate,
  calculateBarcodeAmount,
} from './utils'

// describe('Test utils functions to DV calculation', () => {
//   test('should convert digitsLine to barcode', () => {
//     const digitsLine = '00190500954014481606906809350314337370000000100'
//     const barcode = '00193373700000001000500940144816060680935031'
//     const digitsLineDV = '594'
//     const barcodeDV = 3
//     expect(mapDigitsLineToBarcode(digitsLine)).toEqual(
//       expect.objectContaining({
//         barcode,
//         digitsLineDV,
//         barcodeDV,
//       })
//     )
//   })
//   test('should convert digitsLine to barcode OTHERCASE', () => {
//     const digitsLine = '82214123262015409829501086059407000021504820097'
//     const barcode = '82210000215048200974123220154098290108605940'
//     const digitsLineDV = '657'
//     const barcodeDV = 0
//     expect(mapDigitsLineToBarcode(digitsLine)).toEqual(
//       expect.objectContaining({
//         barcode,
//         digitsLineDV,
//         barcodeDV,
//       })
//     )
//   })
//   test('should extract barcode expirationDate', () => {
//     const barcode = '00193373700000001000500940144816060680935031'
//     const expirationDate = '2007-12-31'
//     expect(calculateBarcodeExpirationDate(barcode)).toBe(expirationDate)
//   })
//   test('should extract barcode expirationDate', () => {
//     const barcode = '00193373700000023500500940144816060680935031'
//     const amount = 23.5
//     expect(calculateBarcodeAmount(barcode)).toEqual(amount)
//   })
//   test('should sum of barcode digits with spectial case (18 = 1+8)', () => {
//     const barcode = '0680935031'
//     const sumBarcode = 36
//     expect(sumBarcodeDigits(barcode)).toBe(sumBarcode)
//   })
//   test('should round up tens digits of numbers', () => {
//     const num = 36
//     const roundedUpNum = 40
//     expect(roundUpTensDigit(num)).toBe(roundedUpNum)
//   })
//   test('should generate sequence of factors', () => {
//     const factorSequence = [2, 3, 4, 5, 6, 7, 8, 9]
//     const factorSequenceSize = 10
//     expect(generateFactors(factorSequence, factorSequenceSize)).toEqual([
//       2, 3, 4, 5, 6, 7, 8, 9, 2, 3,
//     ])
//   })
//   test('should calculate common mod10 DV calculation (Concessionaire)', () => {
//     const expectedDV = 1
//     const barcode = '8220000215048200974123220154098290108605940'
//     const factorSequence = [2, 1]
//     const mod = 10
//     const shouldLimitSum = true
//     const customModMapping = (remainderSumMod: number, mod = 10) =>
//       remainderSumMod === 0 ? 0 : mod - remainderSumMod
//     expect(
//       commonDVCalculation(
//         barcode,
//         factorSequence,
//         mod,
//         shouldLimitSum,
//         customModMapping
//       )
//     ).toBe(expectedDV)
//   })
//   test('should calculate common mod11 DV calculation (Concessionaire)', () => {
//     const expectedDV = 0
//     const barcode = '8220000215048200974123220154098290108605940'
//     const factorSequence = [2, 3, 4, 5, 6, 7, 8, 9]
//     const mod = 11
//     const shouldLimitSum = false
//     const customModMapping = (remainderSumMod: number, mod: number) => {
//       if (remainderSumMod === 0 || remainderSumMod == 1) return 0
//       if (remainderSumMod === 10) return 1
//       return mod - remainderSumMod
//     }
//     expect(
//       commonDVCalculation(
//         barcode,
//         factorSequence,
//         mod,
//         shouldLimitSum,
//         customModMapping
//       )
//     ).toBe(expectedDV)
//   })
//   test('should calculate custom mod10 DV calculation (Bank)', () => {
//     const expectedDV = 3
//     const barcode = '00190500954014481606906809350314337370000000100'
//     const factorSequence = [2, 1]
//     const mod = 10
//     const shouldLimitSum = true
//     expect(
//       commonDVCalculation(barcode, factorSequence, mod, shouldLimitSum)
//     ).toBe(expectedDV)
//   })
//   test('should calculate common mod11 DV calculation (Bank)', () => {
//     const expectedDV = 3
//     const barcode = '0019373700000001000500940144816060680935031'
//     const factorSequence = [2, 3, 4, 5, 6, 7, 8, 9]
//     const mod = 11
//     const shouldLimitSum = false
//     const customModMapping = (remainderSumMod: number, mod: number) => {
//       if (
//         remainderSumMod === 0 ||
//         remainderSumMod === 10 ||
//         remainderSumMod == 11
//       )
//         return 1
//       return mod - remainderSumMod
//     }
//     expect(
//       commonDVCalculation(
//         barcode,
//         factorSequence,
//         mod,
//         shouldLimitSum,
//         customModMapping
//       )
//     ).toBe(expectedDV)
//   })
// })

test('should calculate common mod10 DV calculation (Concessionaire)', () => {
  const expectedDV = 7
  const barcode = '8460000001435900240200240500024384221010811'
  const factorSequence = [2, 1]
  const mod = 10
  const shouldLimitSum = true
  const customModMapping = (remainderSumMod: number, mod = 10) =>
    remainderSumMod === 0 ? 0 : mod - remainderSumMod
  expect(
    commonDVCalculation(barcode, factorSequence, mod, shouldLimitSum, customModMapping)
  ).toBe(expectedDV)
})
// test('should calculate common mod11 DV calculation (Concessionaire)', () => {
//   const expectedDV = 7
//   const barcode = '84670000001'
//   const factorSequence = [2, 3, 4, 5, 6, 7, 8, 9]
//   const mod = 11
//   const shouldLimitSum = false
//   const customModMapping = (remainderSumMod: number, mod: number) => {
//     if (remainderSumMod === 0 || remainderSumMod == 1) return 0
//     if (remainderSumMod === 10) return 1
//     return mod - remainderSumMod
//   }
//   expect(
//     commonDVCalculation(barcode, factorSequence, mod, shouldLimitSum, customModMapping)
//   ).toBe(expectedDV)
// })
