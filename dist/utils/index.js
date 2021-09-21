"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
function createToken(userId) {
    const token = jsonwebtoken_1.default.sign({ userId }, config_1.default.secretToken, {
        expiresIn: "7d",
    });
    return token;
}
function decodeToken(token) {
    return jsonwebtoken_1.default.verify(token, config_1.default.secretToken);
}
exports.default = { createToken, decodeToken };
