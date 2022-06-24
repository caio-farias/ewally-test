import { DVCalculation } from '../src/utils/verificationDigitsCalc.util'

describe('Test DVcalculation() cases', () => {
  test('should calculate common mod10 DV calculation (Concessionaire)', () => {
    const expectedDV = 1
    const barcode = '8220000215048200974123220154098290108605940'
    const mod = 10
    const shouldLimitSum = true
    const customModMapping = (remainderSumMod: number, mod = 10) =>
      remainderSumMod === 0 ? 0 : mod - remainderSumMod
    expect(DVCalculation(barcode, customModMapping, shouldLimitSum, mod)).toBe(expectedDV)
  })
  test('should calculate common mod11 DV calculation (Concessionaire)', () => {
    const expectedDV = 0
    const barcode = '8220000215048200974123220154098290108605940'
    const mod = 11
    const shouldLimitSum = false
    const customModMapping = (remainderSumMod: number, mod: number) => {
      if (remainderSumMod === 0 || remainderSumMod == 1) return 0
      if (remainderSumMod === 10) return 1
      return mod - remainderSumMod
    }
    expect(DVCalculation(barcode, customModMapping, shouldLimitSum, mod)).toBe(expectedDV)
  })
  test('should calculate custom mod10 DV calculation (Bank)', () => {
    const expectedDV = 3
    const barcode = '00190500954014481606906809350314337370000000100'
    const mod = 10
    const shouldLimitSum = true
    expect(DVCalculation(barcode, undefined, shouldLimitSum, mod)).toBe(expectedDV)
  })
  test('should calculate common mod11 DV calculation (Bank)', () => {
    const expectedDV = 3
    const barcode = '0019373700000001000500940144816060680935031'
    const mod = 11
    const shouldLimitSum = false
    const customModMapping = (remainderSumMod: number, mod: number) => {
      if (remainderSumMod === 0 || remainderSumMod === 10 || remainderSumMod == 11)
        return 1
      return mod - remainderSumMod
    }
    expect(DVCalculation(barcode, customModMapping, false, mod)).toBe(expectedDV)
  })
})
