import { Schema, model } from 'mongoose'

const meetingSchema = new Schema({
  idMeeting: {
    type: Number
  },
  name: {
    type: String,
    unique: true,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true,
  versionKey: false
})

export default model('Meeting', meetingSchema);