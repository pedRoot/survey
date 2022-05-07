import User from "../models/User";
import Role from "../models/Role";
import jws from "jsonwebtoken";
import config from "../config/config";
import argon2 from "argon2";

export const signup = async (req, res) => {
  try {
    const { email, password, roles } = req.body;

    const user = new User({
      email,
      password: await argon2.hash(password),
    });

    if (roles) {
      const role = await Role.find({ name: { $in: roles } });

      if (role) {
        user.role = role.map((role) => role.id);
      }
    } else {
      const role = await Role.findOne({ name: "user" });
      user.role = [role.id];
    }

    const newUser = await user.save();

    res.status(201).json();
  } catch (error) {
    res.status(500).json({ message: "User not created...!!!" });
    console.error("Error in add User: ", error.name + ": " + error.message);
  }
};

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found...!!!" });

    if (!user.isActive)
      res.status(403).json({ message: "User not active...!!!" });

    const isValidPassword = await argon2.verify(user.password, password);
    if (!isValidPassword)
      return res.status(400).json({ message: "Credentials not valid...!!!" });

    const token = jws.sign({ id: user.id }, config.SECRET, {
      expiresIn: 86400, //24 horas
    });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "User not verify...!!!" });
    console.error("Error in login User: ", error.name + ": " + error.message);
  }
};
