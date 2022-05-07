import {Schema, model} from 'mongoose';

const drawSchema = new Schema({
  name: {
    type: String,
    required: true
    },
  meeting: {
    ref: "Meeting",
    type: Schema.Types.ObjectId
    },

  user: {
    ref: "User",
    type: Schema.Types.ObjectId
  },
  countAsSelected: {
    type: Boolean,
    default: true
  }
  },{
    timestamps: true,
    versionKey: false
  });

export default model('Draw', drawSchema);