import User from "../models/UserSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "15d",
  });
};

function isStrongPassword(password) {
  const strongPasswordRegex =
    /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  return strongPasswordRegex.test(password);
}

export const register = async (req, res) => {
  const { username, password } = req.body;
  if (!isStrongPassword(password)) {
    return res
      .status(401)
      .json({ success: false, message: "Password is not strong enough" });
  }

  try {
    let user = null;
    user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ message: "User already exist" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    user = new User({
      username,
      password: hashPassword,
    });
    await user.save();

    res.status(200).json({
      success: true,
      message: "User Registerd",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  const { username } = req.body;
  try {
    let user = null;
    user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid Credantials" });
    }

    const token = generateToken(user);

    const { password, ...rest } = user._doc;

    res.status(200).json({
      status: true,
      message: "Successfully login",
      token,
      data: { ...rest },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: false, message: "Failed to login" });
  }
};
