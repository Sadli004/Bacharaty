const { bucket } = require("../index");
const {
  signup,
  getUser,
  signin,
  likeProduct,
  addToCart,
  removeCart,
  getCart,
  getLiked,
} = require("../controllers/UserController");
const { checkAccess } = require("../middleware/authMiddlware");
const { upload } = require("../utils/upload");
const router = require("express").Router();

router.post("/upload", upload().single("file"), (req, res) => {
  res.send("File upload successful");
});

router.get("/download/files/:fileId", async (req, res) => {
  try {
    const { fileId } = req.params;

    // Check if file exists
    const file = await bucket
      .find({ _id: new mongoose.Types.ObjectId(fileId) })
      .toArray();
    if (file.length === 0) {
      return res.status(404).json({ error: { text: "File not found" } });
    }

    // set the headers
    res.set("Content-Type", file[0].contentType);
    res.set("Content-Disposition", `attachment; filename=${file[0].filename}`);

    // create a stream to read from the bucket
    const downloadStream = bucket.openDownloadStream(
      new mongoose.Types.ObjectId(fileId)
    );

    // pipe the stream to the response
    downloadStream.pipe(res);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: { text: `Unable to download file`, error } });
  }
});
// Signup User
router.post("/signup", upload().single("profilepic"), signup);
router.post("/login", signin);
router.get("/:id", getUser);
router.post("/product/like", checkAccess, likeProduct);
router.get("/product/like/", checkAccess, getLiked);
router.get("/product/cart", checkAccess, getCart);
router.post("/product/cart", checkAccess, addToCart);
module.exports = router;
