import argon2 from 'argon2';
import jws from 'jsonwebtoken';

import User from '../models/User';
import Role from '../models/Role';
import config from '../config/config';

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) throw 'Not found';
    if (!user.isActive) throw 'User inactive';

    const isValidPassword = await argon2.verify(user.password, password);
    if (!isValidPassword) throw 'Credentials invalids';

    const access_token = jws.sign({ id: user.id }, config.SECRET, {
      expiresIn: 86400,
    });

    res.status(200).json({ access_token });
  } catch (error) {
    res.status(403).json({ error });
  }
};

export const signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user) throw 'previously registered';

    const role = await Role.findOne({ name: 'user' }, '_id');

    await new User({
      email: email,
      password: await argon2.hash(password),
      role: [role._id],
    }).save();

    res.status(201).json('proccess successfull');
  } catch (error) {
    res.status(400).json({ error });
  }
};
