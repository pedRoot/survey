import {Schema, model} from 'mongoose'

const roleSchema = new Schema({
  name: String
}, {
  versionKey: false,
  timestamps: true
})

export default model('Role', roleSchema);