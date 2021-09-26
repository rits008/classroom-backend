"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("./config"));
const logger_1 = __importDefault(require("./logger"));
const routes_1 = __importDefault(require("./routes"));
const app = express_1.default();
app.use(express_1.default.json());
const corsOptions = {
    origin: ["http://localhost:3000"],
    credentials: true,
};
app.use(cors_1.default(corsOptions));
const mongooseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
};
mongoose_1.default.connect(config_1.default.databaseUrl, mongooseOptions).then(() => app.listen(config_1.default.port, () => {
    logger_1.default.info(`server is running on ${config_1.default.port} success!`);
    routes_1.default(app);
}));
