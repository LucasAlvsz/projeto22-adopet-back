class AppError extends Error {
  public readonly code: number;
  public readonly message: string;

  constructor(code: number, message: string) {
    super(message);
    this.code = code;
    this.message = message;
  }
}

class InternalServerError extends AppError {
  constructor(message: string) {
    super(500, message);
  }
}

class UnprocessableEntityError extends AppError {
  constructor(message: string) {
    super(422, message);
  }
}

class UnauthorizedError extends AppError {
  constructor(message: string) {
    super(401, message);
  }
}

class ConflictError extends AppError {
  constructor(message: string) {
    super(409, message);
  }
}

class NotFoundError extends AppError {
  constructor(message: string) {
    super(404, message);
  }
}

export {
  AppError,
  InternalServerError,
  UnprocessableEntityError,
  UnauthorizedError,
  ConflictError,
  NotFoundError,
};
