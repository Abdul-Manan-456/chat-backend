import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema.Types;

const messageSchema = mongoose.Schema(
  {
    sender: {
      type: ObjectId,
      ref: "UserModel",
    },
    message: {
      type: String,
      trim: true,
    },
    type: {
      type: String,
      required: true,
      trim: true,
    },
    file: {
      link: {
        type: String,
        trim: true,
      },
      size: Number,
      isDownloaded: {
        type: Boolean,
        default: false,
      },
    },
    conversation: {
      type: ObjectId,
      ref: "ConversationModel",
    },
  },
  {
    collection: "messages",
    timestamps: true,
  }
);

const MessageModel =
  mongoose.models.MessageModel || mongoose.model("MessageModel", messageSchema);

export default MessageModel;
