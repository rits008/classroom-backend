import { NextFunction, Request, Response } from "express";
import log from "../logger";
import { decodeToken } from "../token";

export const isAuthorizedUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorization = req.headers.authorization;

  if (!authorization) throw new Error("No token provided");

  const token = authorization.split(" ")[1];

  const payload = decodeToken(token);

  log.info(`${payload}`);

  //   if(t)
};
