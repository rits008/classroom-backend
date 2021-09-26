import { Request, Response } from "express";
import CourseService from "../../services/course.service";

async function createCourse(req: Request, res: Response) {
  const course = await CourseService.createCourse(req.body);
  res.json(course);
}

async function createAssignment(_req: Request, res: Response) {
  res.send("createAssignment");
}

async function createAnnouncement(_req: Request, res: Response) {
  res.send("createAnnouncement");
}

export default { createCourse, createAnnouncement, createAssignment };
