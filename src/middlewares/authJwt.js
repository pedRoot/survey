import jwt from 'jsonwebtoken';

import config from '../config/config';
import User from '../models/User';

function tokenValidation(token) {
  return jwt.verify(token, config.SECRET);
}

async function getToken(req) {
  try {
    const token = req.headers['x-api-key'];
    if (!token) throw 'Key in head not present';

    return token;
  } catch (error) {
    return false;
  }
}

export const isAdmin = async (req, res, next) => {
  try {
    const token = await getToken(req);
    if (!token) throw 'token if required';

    const payload = tokenValidation(token);
    if (!payload) throw 'token invalid';

    const user = await User.findById(payload.id, { password: 0 }).populate({
      path: 'role',
      select: 'name -_id',
    });

    if ('admin' !== user.role.name) throw 'Unauthorized access';

    next();
  } catch (error) {
    res.status(403).json({ error }).end();
  }
};

export const tokenVerification = async (req, res, next) => {
  try {
    const token = await getToken(req);
    if (!token) throw 'token if required';

    const payload = tokenValidation(token);
    if (!payload) throw 'token invalid';

    next();
  } catch (error) {
    res.status(403).json({ error }).end();
  }
};

export const isActive = async (req, res, next) => {
  try {
    const token = await getToken(req);
    if (!token) throw 'token if required';

    const payload = tokenValidation(token);
    if (!payload) throw 'token invalid';

    const user = await User.findById(payload.id);
    if (!user.isActive) throw 'User not active';

    next();
  } catch (error) {
    res.status(403).json({ error }).end();
  }
};
