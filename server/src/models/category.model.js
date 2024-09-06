import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema(
  {
    electronic: [
      {
        type: String,
      },
    ],
    groceries: [
      {
        type: String,
      },
    ],
    books: [
      {
        type: String,
      },
    ],
    costumes: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Category = mongoose.model("Category", categorySchema);
