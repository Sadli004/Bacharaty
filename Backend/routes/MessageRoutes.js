const {
  sendMessage,
  createChat,
  getMessages,
  getChatsPerUser,
  getChatById,
  deleteMessage,
  editMessage,
} = require("../controllers/MessageController");
const { upload } = require("../utils/upload");
const router = require("express").Router();
const { checkAccess } = require("../middleware/authMiddlware");
router.post("/", createChat);
router.get("/user", checkAccess, getChatsPerUser);
router.post("/:chatId", checkAccess, upload.single("file"), sendMessage);
router.get("/:chatId", checkAccess, getChatById);
router.patch("/:messageId", checkAccess, editMessage);
router.delete("/:messageId", checkAccess, deleteMessage);
// router.get("chat/:chatId", checkAccess, getChatById);
module.exports = router;
