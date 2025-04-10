const {
  sendMessage,
  createChat,
  getChatsPerUser,
  getChatById,
  deleteMessage,
  editMessage,
  markSeen,
} = require("./chat.controller");
const { upload } = require("../../utils/upload");
const router = require("express").Router();
const { checkAccess } = require("../../middleware/authMiddlware");
router.post("/", createChat);
router.get("/user", checkAccess, getChatsPerUser);
router.post("/:chatId", checkAccess, upload.single("file"), sendMessage);
router.get("/:chatId", checkAccess, getChatById);
router.patch("/seen/:chatId", checkAccess, markSeen);
router.patch("message/edit/:messageId", checkAccess, editMessage);
router.delete("message/delete/:messageId", checkAccess, deleteMessage);
module.exports = router;
