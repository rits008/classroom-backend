import { NextFunction, Request, Response } from "express";

import { getUserById } from "../api/common";
import ErrorHandler from "../errors/ErrorHandler";
import { decodeToken } from "../token";
import AdminService from "../services/admin.service";

type JwtPayload = {
  userId: string;
};

export interface RequestWithUser extends Request {
  user?: any;
}

export const isAuthorizedUser = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const authorization = req.headers.authorization;

  if (!authorization)
    return next(ErrorHandler.forbiddenError("no token provided"));

  const token = authorization.split(" ")[1];

  const payload = decodeToken(token) as JwtPayload;

  if (!payload) return next(ErrorHandler.forbiddenError("invalid token"));

  const user = await getUserById(payload.userId);

  if (!user) return next(ErrorHandler.notFoundError("user not found"));

  req.user = user;

  next();
};

export const isInstructor = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  if (!req.user.isInstructor)
    return next(ErrorHandler.forbiddenError("not an instructor"));

  req.body.id = req.user._id;

  next();
};

export async function isAdmin(req: Request, res: Response, next: NextFunction) {
  if (req.body.role != "instructor") next();
  else {
    const authorization = req.headers.authorization;
    const token = authorization?.split(" ")[1];
    const payload = decodeToken(token) as JwtPayload;
    const adminId = payload.userId;
    const admin = await AdminService.getAdminById(adminId);
    if (admin) next();
    else next(ErrorHandler.forbiddenError("not an admin"));
  }
}
