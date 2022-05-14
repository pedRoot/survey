import { Schema, model } from 'mongoose';

const surveySchema = new Schema(
  {
    titleQuestion: {
      type: String,
      required: true,
    },
    userOwner: {
      ref: 'User',
      type: Schema.Types.ObjectId,
    },
    answer: [
      {
        title: { type: String, required: true },
        isCorrectAnswer: { type: Boolean, default: false },
      },
    ],
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

export default model('Survey', surveySchema);
