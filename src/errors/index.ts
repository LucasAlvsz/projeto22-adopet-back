import { AppError } from "@/types/errorType"

const unauthorizedError = (message: string): AppError => {
	return {
		status: 401,
		message,
		type: "AppError",
	}
}

const conflictError = (message: string) => {
	return {
		status: 409,
		message,
		type: "AppError",
	}
}

const notFoundError = (message: string) => {
	return {
		status: 404,
		message,
		type: "AppError",
	}
}

const unprocessableEntityError = (message: string) => {
	return {
		status: 422,
		message,
		type: "AppError",
	}
}

export { unauthorizedError, conflictError, notFoundError, unprocessableEntityError }
