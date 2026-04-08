import mongoose from "mongoose";

const FriendRequestSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["peding", "rejected", "approved"],
      default: "pending",
    },
  },
  { timestamps: true },
);

export const FriendRequest = mongoose.model(
  "FriendRequest",
  FriendRequestSchema,
);
export type FriendRequestType = mongoose.InferSchemaType<
  typeof FriendRequest
> & {
  _id: mongoose.Schema.Types.ObjectId;
};

FriendRequestSchema.index({ senderId: 1, receiverId: 1 }, { unique: true });
