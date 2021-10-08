"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = exports.isInstructor = exports.isAuthorizedUser = void 0;
const common_1 = require("../api/common");
const ErrorHandler_1 = __importDefault(require("../errors/ErrorHandler"));
const token_1 = require("../token");
const admin_service_1 = __importDefault(require("../services/admin.service"));
const isAuthorizedUser = async (req, res, next) => {
    const authorization = req.headers.authorization;
    if (!authorization)
        return next(ErrorHandler_1.default.forbiddenError("no token provided"));
    const token = authorization.split(" ")[1];
    const payload = token_1.decodeToken(token);
    if (!payload)
        return next(ErrorHandler_1.default.forbiddenError("invalid token"));
    const user = await common_1.getUserById(payload.userId);
    if (!user)
        return next(ErrorHandler_1.default.notFoundError("user not found"));
    req.user = user;
    next();
};
exports.isAuthorizedUser = isAuthorizedUser;
const isInstructor = async (req, res, next) => {
    if (!req.user.isInstructor)
        return next(ErrorHandler_1.default.forbiddenError("not an instructor"));
    req.body.id = req.user._id;
    next();
};
exports.isInstructor = isInstructor;
async function isAdmin(req, res, next) {
    if (req.body.role != "instructor")
        next();
    else {
        const authorization = req.headers.authorization;
        const token = authorization === null || authorization === void 0 ? void 0 : authorization.split(" ")[1];
        const payload = token_1.decodeToken(token);
        const adminId = payload.userId;
        const admin = await admin_service_1.default.getAdminById(adminId);
        if (admin)
            next();
        else
            next(ErrorHandler_1.default.forbiddenError("not an admin"));
    }
}
exports.isAdmin = isAdmin;
