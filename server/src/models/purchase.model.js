import mongoose, { Schema } from "mongoose";

const purchaseSchema = new Schema(
  {
    userId: {
      type: String,
    },
    month: [
      {
        type: String,
      },
    ],
    count: {
      type: Number,
    },

    luxery: [
      {
        type: String,
      },
    ],
    high: [
      {
        type: String,
      },
    ],
    regular: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Purchase = mongoose.model("Purchase", purchaseSchema);
