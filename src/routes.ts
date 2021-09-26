import { Express, NextFunction, Request, Response } from "express";
import { login, register } from "./api/common";
import studentRouter from "./api/student/student";
import instructorRouter from "./api/instructor/instructor";
import courseRouter from "./api/courses/course";
import ErrorHandler from "./errors/ErrorHandler";
import log from "./logger";
import asyncMiddleware from "./middleware/async-wrapper";
import { validateLogin, validateRegister } from "./middleware/validate";

export default function (app: Express) {
  app.post("/login", validateLogin, asyncMiddleware(login));
  app.post("/register", validateRegister, asyncMiddleware(register));
  app.use("/student", studentRouter);
  app.use("/course", courseRouter);
  app.use("/instructor", instructorRouter);
  app.use((req: Request, res: Response) => {
    res.status(404).send("Not found");
  });

  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ErrorHandler) {
      log.error({ error: err });
      return res.status(err.status).json({ message: err.msg, status: "error" });
    }

    console.log(err);

    log.error({ error: err });

    res.status(500).json({ msg: "Internal server error", status: "error" });
  });
}
