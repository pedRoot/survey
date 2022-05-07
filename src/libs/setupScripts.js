import argon2 from "argon2";

import Role from "../models/Role";
import User from "../models/User";

export const createRole = async () => {
  try {
    const count = await Role.estimatedDocumentCount();

    if (count > 0) return;

    const values = await Promise.all([
      new Role({ name: "user" }).save(),
      new Role({ name: "admin" }).save(),
    ]);
  } catch (error) {
    console.log(error);
  }
};

export const createUser = async () => {
  try {
    const count = await User.estimatedDocumentCount();

    if (count > 0) return;

    let role = await Role.findOne({ name: "admin" }, "_id");

    await User.create({
      email: "ptorres2408@gmail.com",
      password: await argon2.hash("enter"),
      role: [role._id],
    });

    role = await Role.findOne({ name: "user" }, "_id");

    await Promise.all([
      new User({
        email: "pedrotorres@outlook.com",
        password: await argon2.hash("enter"),
        role: [role._id],
      }).save(),
    ]);
  } catch (error) {
    console.log(error);
  }
};
