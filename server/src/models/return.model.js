import mongoose, { Schema } from "mongoose";

const returnSchema = new Schema(
  {
    countreturn: {
      type: Number,
    },
    productsreturn: [
      {
        type: String,
      },
    ],
    userId: {
        type: String, //stores user objectIda
    }
  },
  {
    timestamps: true,
  }
);

export const Return = mongoose.model("Return", returnSchema);
