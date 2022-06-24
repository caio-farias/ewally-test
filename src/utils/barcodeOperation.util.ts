export const extractDvFromBarcode = (barcode: string, DVIndex: number) =>
  barcode.slice(0, DVIndex) + barcode.slice(DVIndex + 1)

export const extractBarcodeAmount = (barcode: string, startIndex = 9, endIndex = 19) =>
  +barcode.slice(startIndex, endIndex) / 100

export const extractBarcodeExpirationDate = (
  barcode: string,
  startIndex = 5,
  endIndex = 9
) => {
  const dateCode = barcode.slice(startIndex, endIndex)
  const initDate = new Date(2000, 6, 3)
  initDate.setDate(+dateCode - 997)
  return initDate.toISOString().slice(0, 10)
}
