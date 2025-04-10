const router = require("express").Router();
const {
  getChatMedia,
  getChatAudio,
  getProfilePicture,
} = require("./files.controller");

router.get("/chat/media/:id", getChatMedia);
router.get("/chat/audio/:id", getChatAudio);
router.get("/user/profile/:id", getProfilePicture);

module.exports = router;
