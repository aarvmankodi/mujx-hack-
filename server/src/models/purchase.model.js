import mongoose, { Schema } from "mongoose";

const purchaseSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    month:{
        type: number,
        required: true,
    },
    // quantity: {
    //   type: Number,
    //   required: true,
    // },
    luxery: {
      type: Number,
      required: true,
    },
    high:{
        type: Number,
        required: true,
    },
    regular: {
        type: Number,
        required: true,
    }
  },
  {
    timestamps: true,
  }
);

export const Purchase = mongoose.model("Purchase", purchaseSchema);
