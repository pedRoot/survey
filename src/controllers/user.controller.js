import argon2 from 'argon2';

import User from '../models/User';

export const get = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id, '-password').populate({
      path: 'role',
      select: 'name -_id',
    });
    if (!user) throw 'Not found';

    res.status(200).json(user);
  } catch (error) {
    res.status(404).json(error);
  }
};

export const list = async (req, res) => {
  try {
    const user = await User.find({}, '-password').populate({
      path: 'role',
      select: 'name -_id',
    });
    if (!user) throw 'Not data';

    res.status(200).json(user);
  } catch (error) {
    res.status(404).json(error);
  }
};

export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, role, password, isActive } = req.body;

    await User.findByIdAndUpdate(id, { email, role, password, isActive });

    res.status(200).json('proccess successfull');
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const remove = async (req, res) => {
  try {
    const { id } = req.params;

    await User.findByIdAndRemove(id);

    res.status(200).json('proccess successfull');
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
