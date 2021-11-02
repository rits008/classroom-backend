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

  static async getAssignmentById(
    _id: string
  ): Promise<AssignmentDocument | null> {
    return Assignment.findById(_id);
  }

  static async addSubmissionToAssignment(
    assignmentId: string,
    submissionId: string
  ): Promise<AssignmentDocument | null> {
    return Assignment.findByIdAndUpdate(assignmentId, {
      $push: { submissions: submissionId },
    });
  }
}
