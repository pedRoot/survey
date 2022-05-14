import jwt from 'jsonwebtoken';

import Survey from '../models/Survey';
import config from '../config/config';

function getToken(req) {
  const token = req.headers['x-api-key'];

  return jwt.verify(token, config.SECRET);
}

export const list = async (req, res) => {
  try {
    const payload = getToken(req);

    const survey = await Survey.find({ userOwner: payload.id });
    if (!survey) throw 'Not found';

    res.status(200).json(survey);
  } catch (error) {
    res.status(204).json(error);
  }
};

export const get = async (req, res) => {
  try {
    const { id } = req.params;

    const payload = getToken(req);

    const survey = await Survey.find(
      { userOwner: payload.id, _id: id },
      'titleQuestion answer isActive -_id'
    );
    if (!survey) throw 'data not found';

    res.status(200).json(survey);
  } catch (error) {
    res.status(204).json(error);
  }
};

export const add = async (req, res) => {
  try {
    const { title, answer } = req.body;

    const payload = getToken(req);

    await new Survey({
      titleQuestion: title,
      userOwner: payload.id,
      answer,
    }).save();

    res.status(200).json('proccess successfull');
  } catch (error) {
    res.status(204).json(error);
  }
};

export const remove = async (req, res) => {
  try {
    const { id } = req.params;

    const payload = getToken(req);

    const survey = await Survey.findOneAndRemove({
      userOwner: payload.id,
      _id: id,
    });
    if (!survey) throw 'data not found';

    res.status(200).json('proccess successfull');
  } catch (error) {
    res.status(204).json(error);
  }
};

export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, answer } = req.body;

    const payload = getToken(req);

    const survey = await Survey.findOneAndUpdate(
      {
        userOwner: payload.id,
        _id: id,
      },
      {
        titleQuestion: title,
        answer,
      }
    );
    if (!survey) throw 'data not found';

    res.status(200).json('proccess successfull');
  } catch (error) {
    res.status(204).json(error);
  }
};
