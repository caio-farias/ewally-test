export const isAllDigitsIntegers = (digitsLine: string) => {
  for (let index = 0; index < digitsLine.length; index++) {
    const digitCharCode = digitsLine.charCodeAt(index)
    if (digitCharCode < 48 || digitCharCode > 57) return false
  }
  return true
}

const calculateSpecialCase = (result: number): number => {
  const numStringArray = Array.from(`${result}`)
  return numStringArray.reduce((acc: number, num: string) => acc + +num, 0)
}

const checkIfItsSpecialCaseAndCalculateResult = (result: number) => {
  if (result <= 9) return result
  return calculateSpecialCase(result)
}

export const sumBarcodeDigits = (
  digitsLine: string,
  factorArray = [2, 1],
  shouldLimitSum = true
) => {
  let digitNum: number
  let result: number
  const digitsLineArray = Array.from(digitsLine).reverse()
  const factors = generateFactors(factorArray, digitsLineArray.length)

  return digitsLineArray.reduce((acc, digit, index) => {
    digitNum = +digit
    result = digitNum * factors[index]
    if (shouldLimitSum) return acc + checkIfItsSpecialCaseAndCalculateResult(result)
    return acc + result
  }, 0)
}

export const generateFactors = (sequence: number[], factorsSequenceSize: number) => {
  const sequenceLength = sequence.length
  const factorsSequence: number[] = []
  for (let i = 0; i < factorsSequenceSize; i++) {
    factorsSequence.push(sequence[i % sequenceLength])
  }
  return factorsSequence
}

export const roundUpTensDigit = (num: number): number => {
  const numString: string = `${num}`
  const stringLength = numString.length
  const tensDigitPosition = stringLength - 2
  const numWithoutUnityDigit = numString.slice(0, tensDigitPosition + 1)
  return (+numWithoutUnityDigit + 1) * 10
}
