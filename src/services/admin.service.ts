import Admin, { AdminDocument } from "../models/admin.model";

type body = {
  email: string;
  password: string;
  name: string;
};

export default class AdminService {
  static async createAdmin(body: body): Promise<AdminDocument> {
    const admin = new Admin({
      email: body.email,
      password: body.password,
      name: body.name,
      isAdmin: true,
    });

    return admin.save();
  }

  static async getAdminById(id: string): Promise<AdminDocument | null> {
    return Admin.findById(id);
  }

  static async getAllAdmins(): Promise<AdminDocument[]> {
    return Admin.find();
  }

  static async getAdminByEmail(email: string): Promise<AdminDocument | null> {
    return Admin.findOne({ email }).select([
      "-__v",
      "-createdAt",
      "-updatedAt",
    ]);
  }
}
