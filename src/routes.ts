import { Express } from "express";
import log from "./logger";

export default function (app: Express) {
  app.get("/", (_req, res) => {
    log.info("reached here");

    res.send("hello");
  });
}
