import { Request, Response } from "express";
import InstructorService from "../../services/instructor.service";
import CourseService from "../../services/course.service";

async function createCourse(req: Request, res: Response) {
  const course = await CourseService.createCourse(req.body);
  await InstructorService.addCourseToInstructor(req.body.id, course._id);
  res.json({ status: "success", message: "course created successfully" });
}

async function getAllInstructors(req: Request, res: Response) {
  const instructors = await InstructorService.getAllInstructors();
  res.json(instructors);
}

async function getCoursesByInstructor(req: Request, res: Response) {
  const id = req.body.id;
  const instructor = await InstructorService.getCoursesByInstructor(id);
  const courses = instructor?.courses.filter((course) => course.isApproved);
  res.json(courses);
}

async function getPendingCoursesByInstructor(req: Request, res: Response) {
  const id = req.body.id;
  const instructor = await InstructorService.getCoursesByInstructor(id);
  const courses = instructor?.courses.filter((course) => !course.isApproved);
  res.json(courses);
}

async function createAssignment(req: Request, res: Response) {
  res.send("createAssignment");
}

async function createAnnouncement(req: Request, res: Response) {
  res.send("createAnnouncement");
}

export default {
  createCourse,
  createAnnouncement,
  createAssignment,
  getAllInstructors,
  getCoursesByInstructor,
  getPendingCoursesByInstructor,
};
