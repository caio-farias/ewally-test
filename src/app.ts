import * as express from 'express'
import * as logger from 'morgan'
import * as cors from 'cors'
import helmet from 'helmet'
import billsRouter from './routes/bills.routes'
import { errorHandler } from './utils/handlers/error.handler'
import 'dotenv/config'
import { enumErrorMessage } from './utils/enums/errorMessages.enum'
import { enumHttpStatus } from './utils/enums/statusCode.enum'

const app = express()
const contextPath = process.env.CONTEXT_PATH || '/api/v1'
app.use(helmet())
app.use(cors())
app.use(logger('dev'))
app.use(contextPath, billsRouter)
app.use(errorHandler)
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
	res
		.status(enumHttpStatus.PAGE_NOT_FOUND)
		.json({ message: enumErrorMessage.pageNotFound })
	return next()
})

export default app
