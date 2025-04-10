const router = require("express").Router();
const userController = require("./user.controller");
const { checkAccess } = require("../../middleware/authMiddlware");
const { upload } = require("../../utils/upload");
//Routes
router.post("/login", userController.signin);
router.get("/", checkAccess, userController.getUser);
router.get("/:id", userController.getUserById);
router.patch("/", checkAccess, upload.single("file"), userController.editUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
