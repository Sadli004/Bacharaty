const Message = require("../models/Message");
const User = require("../models/User");
const Chat = require("../models/Chat");
const mongoose = require("mongoose");
const { uploadToGridFS } = require("../utils/upload");
const { Media } = require("../models/Media");

module.exports.getChatsPerUser = async (req, res) => {
  const { uid } = req.user;
  try {
    if (!mongoose.isValidObjectId(uid))
      return res.status(400).send("Invalid id");
    const user = await User.findById(uid)
      .select("chats")
      .populate({
        path: "chats.receiver chats.chatId",
        select: "name lastMessage",
        populate: {
          path: "lastMessage",
          select: "content sender",
          populate: {
            path: "sender",
            select: "username",
          },
        },
      });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
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
  const sender = req.user.uid;
  const { receiver, content } = req.body;
  const file = req.file;

  if (!sender || !receiver || (!content && !file))
    return res.status(401).send("All fields are required");

  try {
    if (
      !mongoose.isValidObjectId(chatId) ||
      !mongoose.isValidObjectId(sender) ||
      !mongoose.isValidObjectId(receiver)
    )
      return res.status(400).send("Invalid ID");

    let messageData = { sender, receiver, content };

    if (file) {
      const fileType = file.mimetype.split("/")[0];

      if (fileType === "image" || fileType === "video") {
        const fileId = await uploadToGridFS(
          file.path,
          file.filename,
          "chat_media"
        );
        const media = new Media({
          filename: file.filename,
          fileId: fileId,
          contentType: file.mimetype,
          uploader: sender,
        });
        await media.save();
        messageData.media = media._id;
      } else if (fileType === "audio") {
        const fileId = await uploadToGridFS(
          file.path,
          file.filename,
          "chat_audio"
        );
        const audio = new Audio({
          filename: file.filename,
          fileId: fileId,
          contentType: file.mimetype,
          uploader: sender,
        });
        await audio.save();
        messageData.audio = audio._id;
      }
    }

    const message = new Message(messageData);
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
module.exports.getChatById = async (req, res) => {
  let { chatId } = req.params;
  const { uid } = req.user;
  if (!mongoose.isValidObjectId(chatId))
    return res.status(400).send("Invalid ID");

  try {
    chatId = new mongoose.Types.ObjectId(chatId);
    const chat = await Chat.aggregate([
      { $match: { _id: chatId } },

      // Lookup messages
      {
        $lookup: {
          from: "messages",
          localField: "messages",
          foreignField: "_id",
          as: "messages",
        },
      },
      //sort messages by timestamp
      {
        $addFields: {
          messages: {
            $sortArray: { input: "$messages", sortBy: { createdAt: 1 } },
          },
        },
      },
      // Extract receiverId from participants
      {
        $addFields: {
          receiverId: {
            $arrayElemAt: [
              {
                $filter: {
                  input: "$participants",
                  as: "participant",
                  cond: {
                    $ne: ["$$participant", uid],
                  },
                },
              },
              0,
            ],
          },
        },
      },

      // Lookup receiver details from User collection
      {
        $lookup: {
          from: "users", // Make sure this matches your User collection name in MongoDB
          localField: "receiverId",
          foreignField: "_id",
          as: "receiver",
        },
      },

      // Unwind receiver array since lookup returns an array
      { $unwind: "$receiver" },

      // Project required fields
      {
        $project: {
          _id: 1, // Chat ID
          messages: {
            _id: 1, // Message ID
            content: 1,
            media: 1,
            audio: 1,
            sender: 1,
          },
          // receiverId: 1,
          receiver: {
            _id: 1, // Extract receiver's ID
            name: 1, // Extract receiver's name
          },
        },
      },
    ]);

    if (!chat || chat.length === 0)
      return res.status(404).send("Chat not found");

    res.status(200).json(chat[0]); // Return first match since _id is unique
  } catch (error) {
    res.status(500).send(error.message);
  }
};
module.exports.editMessage = async (req, res) => {
  const { messageId } = req.params;
  const { uid } = req.user;
  const { content } = req.body;
  try {
    if (!mongoose.isValidObjectId(messageId))
      return res.status(400).send("Invalid message");
    const message = await Message.findById(messageId);
    if (!message) return res.status(404).send("Message not found");
    if (message.sender.toString() !== uid)
      return res.status(401).send("Unauthorized");
    message.content = content;
    await message.save();
    res.status(200).json(message);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
// module.exports.getChatById = async (req, res) => {
//   const { chatId } = req.params;
//   const { uid } = req.user;
//   try {
//     if (!mongoose.Types.isValidObjectId(chatId) || !mongoose.Types.isValid(uid))
//       return res.status(400).send("Invalid id");
//     const chat = await Chat.aggregate([
//       { $match: { _id: chatId } },
//       {
//         $lookup: {
//           from: "messages",
//           localField: "messages",
//           foreignField: "_id",
//           as: "messages",
//         },
//       },
//       {
//         $addFields: {
//           receiverId: {
//             $arrayElemAt: [
//               {
//                 $filter: {
//                   input: "$participants",
//                   as: "participant",
//                   cond: {
//                     $ne: ["$$participant", uid],
//                   },
//                 },
//               },
//               0,
//             ],
//           },
//         },
//       },
//       {
//         $lookup: {
//           from: "users",
//           localField: "receiverId",
//           foreignField: "_id",
//           as: "receiver",
//         },
//       },
//       {
//         $project: {
//           _id: 1,
//           messages: 1,
//           receiverId: 1,
//           receiver: {
//             _id: 1,
//             name: 1,
//           },
//         },
//       },
//     ]);
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// };
module.exports.deleteMessage = (req, res) => {
  const { messageId } = req.params;
  if (!mongoose.isValidObjectId(messageId))
    return res.status(400).send("Invalid ID");
  else {
    Message.findByIdAndDelete(messageId)
      .then((message) => {
        if (!message) return res.status(404).send("Message not found");
        res.status(200).send("Message deleted successfully");
      })
      .catch((error) => res.status(500).send(error.message));
  }
};
