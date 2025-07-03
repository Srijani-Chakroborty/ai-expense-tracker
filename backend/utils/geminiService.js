const { GoogleGenAI } = require("@google/genai");

// Pass your API key
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});
function withTimeout(promise, ms) {
  const timeout = new Promise((_, reject) =>
    setTimeout(() => reject(new Error("Gemini API timed out")), ms)
  );
  return Promise.race([promise, timeout]);
}

exports.getInsightFromGemini = async (transactions) => {
  const prompt = `
    I have the following income and expense data:

    ${JSON.stringify(transactions, null, 2)}

    Please analyze this and give me:
    1. Top 3 insights
    2. Any unusual expense patterns
    3. Recommendations to save more
    Keep it concise and helpful.
  `;

  const response = await withTimeout(
    ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    }),
    20000 // 20 seconds timeout
  );

  return response.text; // No need for response.response.text in new SDK
};
