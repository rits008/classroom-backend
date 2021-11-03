import { Router } from "express";
import { validateSubmission } from "../../middleware/validate";
import asyncMiddleware from "../../middleware/async-wrapper";
import * as controllers from "./assignment.control";
import { isInstructor } from "../../middleware/auth";

const router = Router();

router.post(
  "/",
  validateSubmission,
  asyncMiddleware(controllers.addSubmission)
);

router.get(
  "/:assignmentId",
  isInstructor,
  asyncMiddleware(controllers.getSubmissions)
);

export default router;
