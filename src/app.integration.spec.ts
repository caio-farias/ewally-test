import { enumHttpStatus } from './utils/enums/enumStatusCode'
import { enumErrorMessage } from './utils/enums/enumErrorsMessages'
import req from 'supertest'
import app from './app'

const validBankBillDigitsLine = '00190500954014481606906809350314337370000000100'
const invalidBankBillDigitsLine = '00190500954014481606906809350314237370000000100'

const validConcessionarieBillDigitsLine =
  '846700000017435900240209024050002435842210108119'
const invalidConcessionarieBillDigitsLine =
  '846500000017435900240209024050002435842210108119'
// ;('84672435842210108110000017435900242090240500')
describe.each([
  {
    scenario: 'Bank Bills',
    digitsLineParams: {
      validDigitsLine: validBankBillDigitsLine,
      invalidDigitsLine: invalidBankBillDigitsLine,
    },
  },
  {
    scenario: 'Concessionarie Bills',
    digitsLineParams: {
      validDigitsLine: validConcessionarieBillDigitsLine,
      invalidDigitsLine: invalidConcessionarieBillDigitsLine,
    },
  },
])('Test endpoint', ({ scenario, digitsLineParams }) => {
  describe(`GET /bills/:digitsLine - ${scenario}`, () => {
    const { validDigitsLine, invalidDigitsLine } = digitsLineParams
    /* Testing valid bill */
    describe('input -> Valid bill', () => {
      test('should respond a json and 200 status code', async () => {
        const res = await req(app)
          .get(apiContext + `/bills/${validDigitsLine}`)
          .set('Accept', 'application/json')
        expect(res.headers['content-type']).toMatch(/json/)
        expect(res.status).toEqual(200)
        expect(res.body).toEqual(
          expect.objectContaining({
            barcode: expect.any(String),
          })
        )
        console.log(res.body)
      })
    })
    /* Testing invalid bill */
    describe('input -> invalid bill', () => {
      it('should respond with 400 status code and invalidBillMessage', async () => {
        const res = await req(app)
          .get(apiContext + `/bills/${invalidDigitsLine}`)
          .set('Accept', 'application/json')

        expect(res.headers['content-type']).toMatch(/json/)
        expect(res.status).toEqual(enumHttpStatus.BAD_REQUEST)
        expect(res.body).toEqual(
          expect.objectContaining({
            message: enumErrorMessage.invalidBillDV,
          })
        )
      })
    })
  })
})
