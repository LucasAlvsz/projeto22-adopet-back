import { AppError } from "@/types/errorType"
import { NextFunction, Request, Response } from "express"

const handleError = (err: AppError, req: Request, res: Response, next: NextFunction) => {
	console.log(err.message)
	res.status(err.type === "AppError" ? err.status : 500).send(
		err.type === "AppError" ? err.message : "Internal server error"
	)
}

export default handleError
