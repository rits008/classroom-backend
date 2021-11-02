import { Router } from "express";
import { validateSubmission } from "../../middleware/validate";
import asyncMiddleware from "../../middleware/async-wrapper";
import * as controllers from "./assignment.control";

const router = Router();

router.post(
  "/",
  validateSubmission,
  asyncMiddleware(controllers.addSubmission)
);

export default router;
