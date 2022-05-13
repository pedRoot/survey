import argon2 from 'argon2';

import User from '../models/User';

export const show = async (req, res) => {
  try {
    const { email } = req.body;

    const search = !email ? {} : { email };
    const user = await User.find(search, 'email isActive -_id').populate({
      path: 'role',
      select: 'name -_id',
    });
    if (!user) throw 'data not found';

    res.status(200).json(user);
  } catch (error) {
    res.status(404).json(error);
  }
};

export const update = async (req, res) => {
  try {
    if (Object.keys(req.body).length == 0)
      throw new Error('Unspecified values');

    if (!req.body.email) throw new Error('Unspecified mailing address...!!!');

    if (req.body.email == 'admin@localhost')
      throw new Error(`User (${req.body.email}) is blocked ...!!!`);

    if (req.body.pasword) req.body.pasword = await argon2.hash(password);

    const user = await User.findOne({ email: req.body.email });
    if (!user) throw new Error(`User (${req.body.email}) not found...!!!`);

    if (req.body.password) user.password = req.body.password;

    if (req.body.wasSelected) user.wasSelected = req.body.wasSelected;

    if (req.body.isActive) user.isActive = req.body.isActive;

    await user.save();

    res.status(200).json(user);
  } catch (error) {
    console.error('Error in update user: ', error.name + ': ' + error.message);
    res.status(500).json({ message: error.message });
  }
};
