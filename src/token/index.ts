import jwt from "jsonwebtoken";
import config from "../config";

export function createToken(email) {
  const token = jwt.sign({ email }, config.secretToken, {
    expiresIn: "7d",
  });

  return token;
}

export function decodeToken(token) {
  return jwt.verify(token, config.secretToken);
}
