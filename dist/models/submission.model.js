"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const submissionSchema = new mongoose_1.default.Schema({
    studentId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "student" },
    assignmentId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "assignment" },
    submissionDate: { type: Date, default: Date.now },
    pdf: { type: String, required: true },
});
const Submission = mongoose_1.default.model("submission", submissionSchema);
exports.default = Submission;
