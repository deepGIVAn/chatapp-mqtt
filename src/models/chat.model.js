import mongoose, { Schema, models } from "mongoose";

const chatSchema = new Schema(
  {
    topic: {
      type: String,
      required: true,
    },
    from: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    to: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    message: {
      type: String,
    },
  },
  { timestamps: true }
);

const Chat = models.Chat || mongoose.model("Chat", chatSchema);
export default Chat;
