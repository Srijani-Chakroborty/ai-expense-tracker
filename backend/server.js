require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const incomeRoutes = require("./routes/incomeRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const geminiRoutes = require("./routes/geminiRoutes");

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "https://ai-expense-tracker-zuyx.vercel.app", // Set this to your actual Vercel frontend URL after deployment
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

connectDB();

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/income", incomeRoutes);
app.use("/api/v1/expense", expenseRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);
app.use("/api/v1/insights", geminiRoutes);

app.get("/", (req, res) => {
  res.send("API is running!");
});

// app.post('/test', (req, res) => {
//     console.log(req.body);
//     res.send('Got it!');
//   });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
