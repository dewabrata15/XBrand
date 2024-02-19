import { Db, ObjectId } from "mongodb";
import { client } from "../config";
import { createToken } from "@/helper/jwt";
import { comaprePass, hashing } from "@/helper/bycrypt";
// validate
import { z } from "zod";

const DATABASE_NAME = process.env.DATABASE_NAME;
const db: Db = client.db(DATABASE_NAME);

export interface UserModel {
  _id: ObjectId;
  name: string;
  username: string;
  email: string;
  password: string;
}

export interface AccessToken {
  access_Token: string;
}

// get
export const getUser = async (): Promise<UserModel[]> => {
  const user = await db
    .collection("users")
    .find({})
    .project<UserModel>({ password: 0 })
    .toArray();
  return user;
};

// login
export const loginUser = async (email: string, password: string) => {
  try {
    // required
    if (!email) throw "email is required";
    if (!password) throw "password is required";

    // must email
    const emailValidate = z.string().email({ message: "must be email format" });
    emailValidate.parse(email);

    const user = await db.collection("users").findOne({ email: email });
    if (!user) throw "invalid email/password";

    const comapre = comaprePass(password, user.password);

    if (!comapre) throw "invalid email/password";

    const token = await createToken({ _id: user._id });
    if (!token) throw "invalid token";

    return { access_Token: token };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.errors[0].message };
    } else {
      return { error: error };
    }
  }
};

// register
export const register = async (body: {
  name: string;
  username: string;
  email: string;
  password: string;
}) => {
  try {
    // required
    if (!body.username) throw "username is required";
    if (!body.email) throw "email is required";
    if (!body.password) throw "password is required";

    // unique
    const username = await db
      .collection("users")
      .findOne({ username: body.username });
    const user = await db.collection("users").findOne({ email: body.email });
    if (username) throw "username must be unique";
    if (user) throw "email must be unique";

    // must email
    const emailValidate = z.string().email({ message: "must be email format" });
    emailValidate.parse(body.email);

    // min length 5
    const minLength = z
      .string()
      .min(5, { message: "Password must contain at least 5 characters" });
    minLength.parse(body.password);

    const newUser = {
      name: body.name,
      username: body.username,
      email: body.email,
      password: hashing(body.password),
    };

    await db.collection("users").insertOne(newUser);
    return "success add new user";
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.errors[0].message };
    } else {
      return { error: error };
    }
  }
};
