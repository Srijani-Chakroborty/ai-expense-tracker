const Income = require("../models/Income");
const Expense = require("../models/Expense");
const { getInsightFromGemini } = require("../utils/geminiService");

exports.getAIInsights = async (req, res) => {
  try {
    const userId = req.user._id;

    // Limit the number of transactions to 15 for both incomes and expenses
    const incomes = await Income.find({ userId }).sort({ date: -1 }).limit(15);
    const expenses = await Expense.find({ userId })
      .sort({ date: -1 })
      .limit(15);

    const transactions = {
      incomes: incomes.map(({ amount, source, date }) => ({
        amount,
        source,
        date,
      })),
      expenses: expenses.map(({ amount, source, date }) => ({
        amount,
        source,
        date,
      })),
    };

    const insights = await getInsightFromGemini(transactions);
    console.log("Gemini AI Insights:", insights);
    res.status(200).json({ insights });
  } catch (error) {
    console.error("Gemini AI Error:", error.message);
    res
      .status(500)
      .json({ message: "Failed to generate insights", error: error.message });
  }
};
