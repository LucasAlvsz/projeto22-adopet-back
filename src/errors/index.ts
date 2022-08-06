import { AppError } from "@/types/errorType"

const unauthorizedError = (message: string): AppError => {
	return {
		status: 401,
		message,
	}
}

const conflictError = (message: string) => {
	return {
		status: 409,
		message,
	}
}

const notFoundError = (message: string) => {
	return {
		status: 404,
		message,
	}
}

const unprocessableEntityError = (message: string) => {
	return {
		status: 422,
		message,
	}
}

export {
	unauthorizedError,
	conflictError,
	notFoundError,
	unprocessableEntityError,
}
