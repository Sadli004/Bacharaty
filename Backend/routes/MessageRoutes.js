const {
  sendMessage,
  createChat,
  getMessages,
} = require("../controllers/MessageController");
const router = require("Express").Router();

router.post("/", createChat);
router.post("/:chatId", sendMessage);
router.get("/:chatId", getMessages);
module.exports = router;
