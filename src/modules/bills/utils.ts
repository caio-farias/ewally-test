const isAllDigitsIntegers = (digitsLine: string) => {
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

const sumBarcodeDigits = (
  digitsLine: string,
  factorArray = [2, 1],
  shouldLimitSum = true
) => {
  let digitNum, result
  const digitsLineArray = Array.from(digitsLine).reverse()
  const factors = generateFactors(factorArray, digitsLineArray.length)

  return digitsLineArray.reduce((acc, digit, index) => {
    digitNum = +digit
    result = digitNum * factors[index]
    if (shouldLimitSum) return acc + checkIfItsSpecialCaseAndCalculateResult(result)
    return acc + result
  }, 0)
}

const generateFactors = (sequence: number[], factorsSequenceSize: number) => {
  const sequenceLength = sequence.length
  const factorsSequence: number[] = []
  for (let i = 0; i < factorsSequenceSize; i++) {
    factorsSequence.push(sequence[i % sequenceLength])
  }
  return factorsSequence
}

const roundUpTensDigit = (num: number): number => {
  const numString: string = `${num}`
  const stringLength = numString.length
  const tensDigitPosition = stringLength - 2
  const numWithoutUnityDigit = numString.slice(0, tensDigitPosition + 1)
  return (+numWithoutUnityDigit + 1) * 10
}

const mapDigitsLineToBarcode = (digitsLine: string) => {
  const init = digitsLine.slice(0, 4)
  const firstBarcodeField = digitsLine.slice(4, 9)
  const firstDV = digitsLine[9]
  const secondBarcodeField = digitsLine.slice(10, 20)
  const secondDV = digitsLine[20]
  const thirdBarcodeField = digitsLine.slice(21, 31)
  const thirdDV = digitsLine[31]
  const barcodeDV = digitsLine[32]
  const expirationDate = digitsLine.slice(33, 37)
  const billValue = digitsLine.slice(37, 47)
  const freeField = firstBarcodeField + secondBarcodeField + thirdBarcodeField
  return {
    barcode: init + barcodeDV + expirationDate + billValue + freeField,
    digitsLineDV: firstDV + secondDV + thirdDV,
    barcodeDV: +barcodeDV,
  }
}

const commonDVCalculation = (
  digitsLine: string,
  factorSequence = [2, 1],
  mod = 10,
  shouldLimitSum = true,
  customModMapping: Function | null = null
): number => {
  const digitsSum = sumBarcodeDigits(digitsLine, factorSequence, shouldLimitSum)
  const digitsSumMod = digitsSum % mod
  if (customModMapping != null) return customModMapping(digitsSumMod, mod)
  return mod - digitsSumMod
}

const digitsFieldDVCalc = (digitsLine: string, mod = 10): string => {
  const onlyMainFields = digitsLine.slice(0, 30)

  const firstField = onlyMainFields.slice(0, 9)
  const secondField = onlyMainFields.slice(10, 20)
  const thirdField = onlyMainFields.slice(19, 29)

  const firstFieldSum = sumBarcodeDigits(firstField)
  const secondFieldSum = sumBarcodeDigits(secondField)
  const thirdFieldSum = sumBarcodeDigits(thirdField)

  const modFirstField = firstFieldSum % mod
  const modSecondField = secondFieldSum % mod
  const modThirdField = thirdFieldSum % mod

  const roundedUpfirstFieldSum = roundUpTensDigit(firstFieldSum)
  const roundedUpsecondFieldSum = roundUpTensDigit(secondFieldSum)
  const roundedUpthirdFieldSum = roundUpTensDigit(thirdFieldSum)

  const firstFieldDV = (roundedUpfirstFieldSum - modFirstField) % mod
  const secondFieldDV = (roundedUpsecondFieldSum - modSecondField) % mod
  const thirdFieldDV = (roundedUpthirdFieldSum - modThirdField) % mod

  return `${firstFieldDV}${secondFieldDV}${thirdFieldDV}`
}

const calculateBarcodeAmount = (barcode: string, startIndex = 9, endIndex = 19) => {
  return +barcode.slice(startIndex, endIndex) / 100
}
const calculateBarcodeExpirationDate = (
  barcode: string,
  startIndex = 5,
  endIndex = 9
) => {
  const dateCode = barcode.slice(startIndex, endIndex)
  const initDate = new Date(2000, 6, 3)
  initDate.setDate(+dateCode - 997)
  return initDate.toISOString().slice(0, 10)
}

export {
  mapDigitsLineToBarcode,
  calculateBarcodeAmount,
  calculateBarcodeExpirationDate,
  digitsFieldDVCalc,
  commonDVCalculation,
  roundUpTensDigit,
  sumBarcodeDigits,
  generateFactors,
  isAllDigitsIntegers,
}
