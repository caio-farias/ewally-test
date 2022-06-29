export const extractDvFromBarcode = (barcode: string, DVIndex: number) =>
	barcode.slice(0, DVIndex) + barcode.slice(DVIndex + 1)

export const extractBarcodeAmount = (
	barcode: string,
	startIndex: number,
	endIndex = startIndex + 10
) => (+barcode.slice(startIndex, endIndex) / 100).toFixed(2)

export const extractBarcodeExpirationDate = (
	barcode: string,
	startIndex: number,
	endIndex: number
) => {
	const dateCode = barcode.slice(startIndex, endIndex)
	const initDate = new Date(1997, 9, 7)
	initDate.setDate(+dateCode + initDate.getDate())
	return initDate.toISOString().slice(0, 10)
}
