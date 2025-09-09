import { Request, Response } from "express";
import User from "../models/user.model";
import md5 from "md5";
import { generateRandomString } from "../../../helpers/generate";

export const register = async (req: Request, res: Response) => {
  try {
    const existEmail = await User.findOne({
      email: req.body.email,
    });
    if (existEmail) {
      res.json({
        code: 400,
        message: "Email already exists!",
      });
    }
    else {
      req.body.password = md5(req.body.password);
      req.body.token = generateRandomString(32);

      const user = new User(req.body);
      await user.save();

      const token = user.token;

      res.json({
        code: 200,
        message: "Register successfully!",
        token: token,
      });
    }

  } catch (error) {
    res.json({
      code: 400,
      message: "Register failed!",
    });
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const email: string = req.body.email;
    const password: string = req.body.password;
    const user = await User.findOne({
      email: email,
      deleted: false,
    });
    if (!user) {
      res.json({
        code: 400,
        message: "Email not found!",
      });
      return;
    }
    if (md5(password) !== user.password) {
      res.json({
        code: 400,
        message: "Password is incorrect!",
      });
      return;
    }
    const token = user.token;
    const id = user._id;
    res.json({
      code: 200,
      message: "Login successfully!",
      token: token,
      id: id,
    });

  } catch (error) {
    res.json({
      code: 400,
      message: "Login failed!",
    });
  }
}

export const detail = async (req: Request, res: Response) => {
  try {
    res.json({
      code: 200,
      message: "Get user detail successfully!",
      data: req["user"],
    });
  } catch (error) {
    res.json({
      code: 400,
      message: "Get user detail failed!",
    });
  }
}