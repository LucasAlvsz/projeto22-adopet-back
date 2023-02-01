import { NextFunction, Request, Response } from "express"

import { UnauthorizedError } from "@/errors"
import { authSchema } from "@/schemas"
import { JWTUtils } from "@/utils"

const validateBearerToken = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { error } = authSchema.authHeaderSchema.validate(req.headers, {
		abortEarly: false,
	})

	if (error) {
		throw new UnauthorizedError(
			"Invalid authorization header: " + error.message
		)
	}

	const token = req.headers.authorization.split(" ")[1]
	const userData = JWTUtils.validateToken(token)
	res.locals.userData = userData
	next()
}

export default validateBearerToken
