import mongoose from "mongoose";

const mcqSchema = new mongoose.Schema(
  {
    code: {               // 👈 document ka id
    type: String,
    required: true,
    unique: true
  },
    category: {
      type: String,
      required: true,
      enum: [
        "general",
        "medical",
        "engineering",
        "management",
        "specialized",
      ],
    },
    subject: { type: String, required: true },

    question: { type: String, required: true },       // Question
    options: { type: [String], required: true },     // Options
    answer: { type: Number, required: true },       // Correct index

    agency: { type: String },
  },
  { timestamps: false }
);

export default mongoose.model("testMcq", mcqSchema);
