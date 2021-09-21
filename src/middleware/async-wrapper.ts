import { NextFunction, Request, Response } from "express";

type handlerFunction = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;
const asyncMiddleware = (handler: handlerFunction) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await handler(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

export default asyncMiddleware;
