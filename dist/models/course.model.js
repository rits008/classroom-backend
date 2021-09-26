"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const CourseSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    courseCode: { type: String, required: true, unique: true },
    isApproved: { type: Boolean, default: false },
    instructor: [
        { type: mongoose_1.Schema.Types.ObjectId, ref: "instructor", required: true },
    ],
    students: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "student" }],
    assignments: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "assignment" }],
    announcements: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "announcement" }],
}, {
    timestamps: true,
});
CourseSchema.pre("save", function (next) {
    this.courseCode = this.courseCode.toUpperCase();
    next();
});
const Course = mongoose_1.default.model("course", CourseSchema);
exports.default = Course;
