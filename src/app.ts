import * as express from 'express'
import * as logger from 'morgan'
import billsRouter from './modules/bills/routes'
import { errorHandler } from './utils/hadlers/errorHandler'
import 'dotenv/config'

const app = express()
const contextPath = process.env.CONTEXT_PATH
app.use(express.json())
app.use(logger('dev'))
app.use(contextPath || '/api/v1', billsRouter)
app.use(errorHandler)

export default app
