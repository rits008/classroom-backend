import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import config from "./config";
import log from "./logger";
import routes from "./routes";

const app = express();

app.use(express.json());

const corsOptions = {
  origin: ["http://localhost:3000", "https://iiitv-classroom.netlify.app"],
  credentials: true,
};

app.use(cors(corsOptions));

const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
};

mongoose.connect(config.databaseUrl, mongooseOptions).then(() =>
  app.listen(config.port, () => {
    log.info(`server is running on ${config.port} success!`);
    routes(app);
  })
);
