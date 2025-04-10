const userModel = require("../../models/User");
const { Media } = require("../../models/Media");
const jwt = require("jsonwebtoken");
const { uploadToGridFS } = require("../../utils/upload");
require("dotenv").config();
module.exports.signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.login(email, password);
    const token = jwt.sign({ uid: user._id }, process.env.TOKEN_SECRET);
    if (token) {
      res.json({ accessToken: token, user: user });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
};
module.exports.getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userModel.findById(id).select("-passowrd");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    console.log(error);
  }
};
module.exports.getUser = async (req, res) => {
  const { uid } = req.user;
  try {
    const user = await userModel.findById(uid).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    console.log(error);
  }
};
module.exports.editUser = async (req, res) => {
  const { uid } = req.user;
  const file = req.file;
  try {
    const updatedData = { ...req.body };
    if (file) {
      const fileId = await uploadToGridFS(
        file.path,
        file.filename,
        "profile_pictures"
      );
      const media = new Media({
        filename: file.filename,
        fileId: fileId,
        contentType: file.mimetype,
        uploader: uid,
      });
      await media.save();
      updatedData.profilePicture = media.fileId;
    }
    const user = await userModel.findByIdAndUpdate(uid, updatedData, {
      new: true,
    });
    if (!user) return res.status(404).json({ error: "User not found" });
    return res.json(user);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
  }
};
module.exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userModel.findByIdAndDelete(id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.log(error);
  }
};
