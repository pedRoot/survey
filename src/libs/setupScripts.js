import argon2 from 'argon2';

import Role from '../models/Role';
import User from '../models/User';
import Survey from '../models/Survey';

export const loadDataForModels = async () => {
  const countRole = await Role.estimatedDocumentCount();
  if (countRole < 1) {
    const values = await Promise.all([
      new Role({ name: 'user' }).save(),
      new Role({ name: 'admin' }).save(),
    ]);
  }

  const countUser = await User.estimatedDocumentCount();
  if (countUser < 1) {
    let role = await Role.findOne({ name: 'admin' }, '_id');

    await User.create({
      email: 'ptorres2408@gmail.com',
      password: await argon2.hash('enter'),
      role: role._id,
    });

    role = await Role.findOne({ name: 'user' }, '_id');

    await new User({
      email: 'pedrotorres@outlook.com',
      password: await argon2.hash('enter'),
      role: role._id,
    }).save();
  }

  const countSurvey = await Survey.estimatedDocumentCount();
  if (countSurvey < 1) {
    const user = await User.findOne({ email: 'pedrotorres@outlook.com' });

    const answer = [
      { title: 'Caracas', isCorrectAnswer: true },
      { title: 'Valencia' },
      { title: 'Maracaibo' },
      { title: 'Mérida' },
    ];

    await Survey({
      titleQuestion: 'Cuál es la ciudad más fría de Venezuela?',
      userOwner: [user._id],
      answer,
    }).save();
  }
};
