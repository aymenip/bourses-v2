import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JwtResponsePayload } from "../user/dtos";
import dotenv from "dotenv";

dotenv.config();

export const hash = async (password: string): Promise<string> => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};

export const generateToken = async (
  payload: JwtResponsePayload
): Promise<string> => {
  const token = jwt.sign(payload, process.env.SECRET_KEY);
  return token;
};
