import { NextFunction, Request, Response } from "express";
import log from "../logger";

import { getUserById } from "../api/common";
import ErrorHandler from "../errors/ErrorHandler";
import { decodeToken } from "../token";

type JwtPayload = {
  userId: string;
};

interface RequestWithUser extends Request {
  user?: any;
}

export const isAuthorizedUser = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const authorization = req.headers.authorization;

  console.log(authorization);

  if (!authorization)
    return next(ErrorHandler.forbiddenError("no token provided"));

  const token = authorization.split(" ")[1];

  const payload = decodeToken(token) as JwtPayload;

  log.info(`payload: ${JSON.stringify(payload)}`);

  if (!payload) return next(ErrorHandler.forbiddenError("invalid token"));

  const user = await getUserById(payload.userId);

  if (!user) return next(ErrorHandler.notFoundError("user not found"));

  req.user = user;

  next();

  //   if(t)
};

export const isInstructor = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  if (!req.user.isInstructor)
    return next(ErrorHandler.forbiddenError("not an instructor"));

  next();
};
