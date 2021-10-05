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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../../middleware/auth");
const async_wrapper_1 = __importDefault(require("../../middleware/async-wrapper"));
const controllers = __importStar(require("./course.controller"));
const validate_1 = require("../../middleware/validate");
const router = express_1.Router();
router.get("/all", async_wrapper_1.default(controllers.getAllCourses));
router.get("/:courseCode", async_wrapper_1.default(controllers.getCourseByCode));
router.post("/approve", auth_1.isAdmin, async_wrapper_1.default(controllers.approveCourse));
router.post("/create_announcement", auth_1.isAuthorizedUser, auth_1.isInstructor, validate_1.validateAnnouncement, async_wrapper_1.default(controllers.createAnnouncement));
router.post("/enroll/:courseCode", auth_1.isAuthorizedUser, async_wrapper_1.default(controllers.enrollStudent));
exports.default = router;
