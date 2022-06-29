import { NextFunction, Request, Response } from 'express'

export const asyncHandler =
	(func: any) => (request: Request, response: Response, next: NextFunction) => {
		Promise.resolve(func(request, response, next)).catch(next)
	}
