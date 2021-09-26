import CourseService from "../../services/course.service";
import { Request, Response } from "express";

async function getAllCourses(req: Request, res: Response) {
  const courses = await CourseService.getAllCourses();
  res.json(courses);
}

async function getCourseByCode(req: Request, res: Response) {
  const course = await CourseService.getCourseByCourseCode(
    req.params.courseCode
  );
  res.json(course);
}

export default { getAllCourses, getCourseByCode };
