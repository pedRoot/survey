import { Schema, model } from 'mongoose';
import argon2 from 'argon2';
import { async } from 'regenerator-runtime';
import { update } from '../controllers/user.controller';

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      ref: 'Role',
      type: Schema.Types.ObjectId,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.pre('findByIdAndUpdate', async function (next) {
  let user = { ...this.getUpdate() };

  if (update.password) {
    user.password = await argon2.hash(update.password);
    this.setUpdate(user);
  }
  next();
});

userSchema.statics.encryptPassword = async (password) => {
  return await argon2.hash(password);
};

userSchema.statics.comparePassword = async (password, receivedPassword) => {
  return await bcrypt.verify(password, receivedPassword);
};

export default model('User', userSchema);
