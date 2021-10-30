import Assignment, { AssignmentDocument } from "../models/assignment.model";

interface assignment {
  date: Date;
  deadline: Date;
  description: string;
  pdf: string;
}

export default class AssignmentService {
  static async createAssignment(
    assignment: assignment
  ): Promise<AssignmentDocument> {
    const newAssignment = new Assignment(assignment);
    return newAssignment.save();
  }
}
