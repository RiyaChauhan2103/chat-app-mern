import mongoose from "mongoose";
import Conversation from "../models/Conversation.model.js";
import Message from "../models/Message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { userId: receiverId } = req.params;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }
    console.log(senderId, receiverId, message);
    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });
    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }
    await Promise.all([conversation.save(), newMessage.save()]);
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      //used to send event to specific client
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }
    return res.status(201).json(newMessage);
  } catch (error) {
    console.log(`error in sendmessage controller ${error.message}`);
    res.status(500).json({ error: "internal server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages");
    // const conversation = await Conversation.aggregate([
    //   {
    //     $match: {
    //       participants: {
    //         $all: [
    //           new mongoose.Types.ObjectId(senderId),
    //           new mongoose.Types.ObjectId(userToChatId),
    //         ],
    //       },
    //     },
    //   },
    //   {
    //     $lookup: {
    //       from: "messages",
    //       localField: "messages",
    //       foreignField: "_id",
    //       as: "messages",
    //     },
    //   },
    // ]);
    // res.status(200).json(conversation[0].messages);
    if (!conversation) return res.status(200).json({});
    const messages = conversation.messages;
    res.status(200).json(messages);
  } catch (error) {
    console.log(`errror in getmessage controller ${error.message}`);
    res.status(500).json({ error: "internal server error" });
  }
};
