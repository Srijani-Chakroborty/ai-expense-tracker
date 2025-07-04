const jwt = require("jsonwebtoken");
const User = require("../models/User");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};
exports.registerUser = async (req, res) => {
  const { fullName, email, password, profileImageUrl } = req.body;
  if (!fullName || !email || !password) {
    return res.status(400).json({ message: "Please fill all fields" });
  }
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }
    const user = await User.create({
      fullName,
      email,
      password,
      profileImageUrl,
    });

    res.status(201).json({
      id: user._id,
      user,
      token: generateToken(user._id),
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error registering user", error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Please fill all fields" });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    res.status(201).json({
      id: user._id,
      user,
      token: generateToken(user._id),
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error registering user", error: error.message });
  }
};
exports.getUserInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error registering user", error: error.message });
  }
};
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { fullName, profileImageUrl } = req.body;
    const updateFields = {};
    if (fullName !== undefined) updateFields.fullName = fullName;

    // Only update profileImageUrl if it is provided and not null/empty string
    if (
      profileImageUrl !== undefined &&
      profileImageUrl !== null &&
      profileImageUrl !== ""
    ) {
      updateFields.profileImageUrl = profileImageUrl;
    }
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateFields },
      { new: true, select: "-password" }
    );
    res.status(200).json({ user: updatedUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating profile", error: error.message });
  }
};
