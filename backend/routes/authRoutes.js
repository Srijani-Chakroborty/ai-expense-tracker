const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const {
  registerUser,
  loginUser,
  getUserInfo,
  updateProfile,
} = require("../controllers/authController");
console.log("Auth routes loaded");
const router = express.Router();
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/getUser", protect, getUserInfo);
router.put("/update-profile", protect, updateProfile);
router.post("/upload-image", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
    req.file.filename
  }`;
  res.status(200).json({ imageUrl });
});

module.exports = router;
