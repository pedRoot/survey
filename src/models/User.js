import { Schema, model } from 'mongoose';
import argon2 from "argon2";

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: [{
    ref: "Role",
    type: Schema.Types.ObjectId
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  wasSelected: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true,
  versionKey: false
});

userSchema.statics.encryptPassword = async (password) => {
  return await argon2.hash(password);
}

userSchema.statics.comparePassword = async (password, receivedPassword) => {
  return await bcrypt.verify(password, receivedPassword);
}

export default model('User', userSchema);