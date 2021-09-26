import { Router } from "express";
import asyncMiddleware from "../../middleware/async-wrapper";
import controllers from "./course.controller";

const router = Router();

router.get("/all", asyncMiddleware(controllers.getAllCourses));

router.get("/:code", asyncMiddleware(controllers.getCourseByCode));

export default router;
