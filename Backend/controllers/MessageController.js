const Message = require("../models/Message");
const User = require("../models/User");
const Chat = require("../models/Chat");
const mongoose = require("mongoose");
module.exports.getChatsPerUser = async (req, res) => {
  const { uid } = req.user;
  try {
    if (!mongoose.isValidObjectId(uid))
      return res.status(400).send("Invalid id");
    const user = await User.findById(uid);
    if (!user) return res.status(404).json({ message: "User not found" });
    const chats = await Chat.find({ participants: { $in: [uid] } });
    res.json(chats);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
module.exports.createChat = async (req, res) => {
  const { patient, doctor } = req.body;
  try {
    if (!patient || !doctor)
      return res.status(400).send("All fields must be filled");
    if (!mongoose.isValidObjectId(patient) || !mongoose.isValidObjectId(doctor))
      return res.status(400).send("Invalid id");
    const existingChat = await Chat.findOne({
      participants: { $all: [patient, doctor] },
    });
    if (existingChat) {
      return res.status(400).json({ message: "chat already exists" }, chat);
    }
    const chat = new Chat({ participants: [patient, doctor] });
    await chat.save();
    const user1 = await User.findByIdAndUpdate(
      patient,
      { $push: { chats: { chatId: chat._id, receiver: doctor } } },
      { new: true }
    );
    const user2 = await User.findByIdAndUpdate(
      doctor,
      { $push: { chats: { chatId: chat._id, receiver: patient } } },
      { new: true }
    );
    res.status(200).json({ message: "Chat created successfully", chat });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
module.exports.sendMessage = async (req, res) => {
  const { chatId } = req.params;
  const { sender, receiver, content } = req.body;
  if (!sender || !receiver || !content)
    return res.status(401).send("all fields are required");
  try {
    if (
      !mongoose.isValidObjectId(chatId) ||
      !mongoose.isValidObjectId(sender) ||
      !mongoose.isValidObjectId(receiver)
    )
      return res.status(400).send("Invlaid id");
    const message = new Message({ sender, receiver, content });
    await message.save();
    await Chat.findByIdAndUpdate(chatId, {
      $push: { messages: message._id },
      lastMessage: message._id,
    });
    return res.status(200).json(message);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
module.exports.getMessages = async (req, res) => {
  const { chatId } = req.params;
  if (!mongoose.isValidObjectId(chatId))
    return res.status(400).send("Invalid ID");
  try {
    const chat = await Chat.findById(chatId).populate("messages");
    if (!chat) return res.status(404).send("Chat not found");
    res.status(200).json(chat.messages);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
module.exports.deleteMessage = (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) return res.status(400).send("Invalid ID");
  else {
    Message.findByIdAndDelete(id)
      .then((message) => {
        if (!message) return res.status(404).send("Message not found");
        res.status(200).send("Message deleted successfully");
      })
      .catch((error) => res.status(500).send(error.message));
  }
};
