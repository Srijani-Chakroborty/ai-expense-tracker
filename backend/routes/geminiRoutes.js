const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { getAIInsights } = require("../controllers/geminiController");

router.post("/", protect, getAIInsights);

module.exports = router;
