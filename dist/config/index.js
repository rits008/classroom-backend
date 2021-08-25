"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
dotenv_1.config();
exports.default = {
    port: process.env.PORT || 4000,
    databaseUrl: process.env.DATABASE_URI,
    saltRounds: 10,
};
