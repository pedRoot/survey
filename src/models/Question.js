import { Schema, model } from "mongoose";

const questionSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    user: [
      {
        ref: "User",
        type: Schema.Types.ObjectId,
      },
    ],
    answer: [
      {
        title: { type: String, required: true },
        isCorrectOption: { type: Boolean, default: false },
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

export default model("Question", questionSchema);
