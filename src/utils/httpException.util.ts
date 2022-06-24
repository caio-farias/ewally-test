export default class HttpException extends Error {
  status: number
  constructor(status: number, message?: string) {
    super(message)
    this.name = 'HtppException'
    this.status = status
    Object.setPrototypeOf(this, HttpException.prototype)
  }
}
