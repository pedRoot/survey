import { Schema, model } from "mongoose";

const answerSchema = new Schema(
  {
    answer: {
      type: String,
      required: true,
    },
    question: [
      {
        ref: "Question",
        type: Schema.Types.ObjectId,
      },
    ],
    thisIsCorrect: {
      type: Boolean,
      default: false,
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

export default model("Answer", answerSchema);
