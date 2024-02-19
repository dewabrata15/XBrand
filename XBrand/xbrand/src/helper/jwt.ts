import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
const secret = process.env.JWT_SECRET;

if (!secret) throw new Error("jwt invalid");

export const createToken = (planText: { _id: ObjectId }) => {
  return jwt.sign(planText, secret);
};
