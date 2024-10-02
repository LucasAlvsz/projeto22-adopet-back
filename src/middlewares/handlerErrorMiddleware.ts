import { NextFunction, Response } from "express";

import { AppError } from "@/errors";

const handleError = (err: AppError, _, res: Response, next: NextFunction) => {
  console.error(err.message);

  err instanceof AppError
    ? res.status(err.code).send({ error: { message: err.message } })
    : res.status(500).send("Internal server error");
};

export default handleError;
