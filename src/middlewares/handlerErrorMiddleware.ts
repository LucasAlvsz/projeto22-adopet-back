import { AppError } from "@/types/errorType"
import { NextFunction, Request, Response } from "express"

const handleError = (
	err: AppError,
	req: Request,
	res: Response,
	next: NextFunction
) => res.status(err.status || 500).send(err.message || "Internal server error")

export default handleError
