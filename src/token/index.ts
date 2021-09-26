import jwt from "jsonwebtoken";
import config from "../config";

export function createToken(userId) {
  const token = jwt.sign({ userId }, config.secretToken, {
    expiresIn: "7d",
  });

  return token;
}

export function decodeToken(token) {
  try {
    return jwt.verify(token, config.secretToken);
  } catch (error) {
    return null;
  }
}
