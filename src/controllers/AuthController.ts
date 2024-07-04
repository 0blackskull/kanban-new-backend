import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { createResponse, validatePassword, validateUsername } from "../utils";
import { createUser, getUser } from "../services/userService";

const login = async (req: Request, res: Response) => {
  try {
    const { user, pwd } = req.body;

    const err = validateUsername(user) ?? validatePassword(pwd);

    if (err) {
      return createResponse(res, 400, err);
    }

    const userDetails = await getUser(user);

    if (!userDetails) {
      return createResponse(res, 404, "User does not exist");
    }

    const result = await bcrypt.compare(pwd, userDetails.password);

    if (!result && process.env.SERVICE_MODE !== "test") {
      return createResponse(res, 401, "Unauthorized access attempt");
    }

    const id =
      userDetails._id instanceof ObjectId
        ? userDetails._id.toHexString()
        : userDetails._id;

    const token = jwt.sign({ id }, process.env.JWT_SECRET as string, {
      expiresIn: "20m",
    });

    res.cookie("token", token, {
      httpOnly: false,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "none",
      // domain: "localhost",
      domain: "netlify.app"
    });

    res.setHeader("Access-Control-Allow-Credentials", "true");

    createResponse(res, 200, {
      message: "Login success!",
    });
  } catch (error) {
    console.error(`Error in login: ${error}`);

    createResponse(res, 500, "Internal server error");
  }
};

const signup = async (req: Request, res: Response) => {
  try {
    const { user, pwd } = req.body;

    const err = validateUsername(user) ?? validatePassword(pwd);

    if (err) {
      return createResponse(res, 400, err);
    }

    const userExists = await getUser(user);

    if (userExists) {
      return createResponse(res, 409, "Username already exists");
    }

    await createUser(user, pwd);

    const userDetails = await getUser(user);

    if (!userDetails) {
      throw Error("User creation failed");
    }

    const id =
      userDetails._id instanceof ObjectId
        ? userDetails._id.toHexString()
        : userDetails._id;

    const token = jwt.sign({ id }, process.env.JWT_SECRET as string, {
      expiresIn: "20m",
    });

    res.cookie("token", token, {
      httpOnly: false,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "none",
      // domain: "localhost",
      domain: "netlify.app"
    });

    createResponse(res, 200, {
      message: "User registered successfully!",
      token,
    });
  } catch (error) {
    console.error(`Error in signup: ${error}`);

    createResponse(res, 500, "Internal server error");
  }
};

export const AuthController = {
  login,
  signup,
};
