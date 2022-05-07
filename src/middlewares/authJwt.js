import jwt from "jsonwebtoken"
import config from '../config/config'
import User from '../models/User'

export const verifyToken = async (req, res, next) => {

  try {
    const token = req.headers["x-access-token"]

    if (!token) return res.status(403).json({ "message": "Login required...!!!" })

    const decodedToken = jwt.verify(token, config.SECRET)
    req.userId = decodedToken.id

    const user = await User.findById(decodedToken.id, { password: 0 })
    if (!user) return res.status(404).json({ message: "credentials not valid" })

    next()

  } catch (error) {
    console.log(error.name, error.message);

    return res.status(401).json({ message: error.message })

  }
}

export const isAuth = async (req, res, next) => {

  try {

    const user = await User.findById(req.userId, { password: 0 }).populate("role", ['name'])

    for (let i = 0; i < user.role.length; i++) {
      const row = user.role[i];

      if (config.ACCESS_RULE[req.method].includes(row.name)) {
        next();
        return;
      }
    }

    return res.status('403').json({ "message": "token not present" })

  } catch (error) {
    console.log(error.stack.split("\n")[1], error.name, error.message);
    return res.status('403').json({ "message": error.message })
  }
}

export const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId, { password: 0 }).populate("role", ['name'])
    
    for (let i = 0; i < user.role.length; i++) {
      const row = user.role[i];

      if ('admin' == row.name) {
        next();
        return;
      }
    }

    return res.status('403').json({ "message": "role unauthorized" })

  } catch (error) {
    console.error(error);
    return res.status('403').json({ "message": error.message })
  }
}