// Metods to process informattion a user
import User from "../models/User";
import argon2 from "argon2";

export const show = async (req, res) => {

  try {

    const fieldsShow = 'email isActive wasSelected';
    let user = '';
    if (Object.keys(req.body).length == 0) {
      user = await User.find({}, fieldsShow);
    } else {
      user = await User.findOne({ email: req.body.email }, fieldsShow);
      if (!user) throw new Error(`User ${req.body.email} not fount...!!!`);
    }

    res.status(200).json({ "message": user });

  } catch (error) {
    console.error('Error in show users: ', error);
    res.status(500).json({ "message": error.message });
  }
}

export const update = async (req, res) => {

  try {

    if (Object.keys(req.body).length == 0) throw new Error('Unspecified values')
    if (!req.body.email) throw new Error('Unspecified mailing address...!!!')
    if (req.body.email == 'admin@localhost') throw new Error(`User (${req.body.email}) is blocked ...!!!`)
    if (req.body.pasword) req.body.pasword = await argon2.hash(password);

    const user = await User.findOne({ email: req.body.email })
    if (!user) throw new Error(`User (${req.body.email}) not found...!!!`)

    if (req.body.password ) user.password = req.body.password
    if (req.body.wasSelected) user.wasSelected = req.body.wasSelected
    if (req.body.isActive) user.isActive = req.body.isActive

    await user.save()

    res.status(200).json(user)

  } catch (error) {
    console.error('Error in update user: ', error.name + ': ' + error.message);
    res.status(500).json({ "message": error.message });
  }
}





