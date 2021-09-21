import { config } from "dotenv";

config();

export default {
  port: process.env.PORT || 4000,
  databaseUrl: process.env.DATABASE_URI as string,
  saltRounds: 10,
  secretToken: process.env.SECRET_TOKEN as string,
};
