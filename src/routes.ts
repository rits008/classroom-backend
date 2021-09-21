import { Express, NextFunction, Request, Response } from "express";
import { login, register } from "./api/common";
import studentRouter from "./api/student/student";
import log from "./logger";
import asyncMiddleware from "./middleware/async-wrapper";

export default function (app: Express) {
  app.post("/login", asyncMiddleware(login));
  app.post("/register", asyncMiddleware(register));
  app.use("/student", studentRouter);
  app.use((req: Request, res: Response) => {
    res.status(404).send("Not found");
  });

  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    log.error({ error: err.message });
    res.json({ msg: "all fields are required" });
  });
}
