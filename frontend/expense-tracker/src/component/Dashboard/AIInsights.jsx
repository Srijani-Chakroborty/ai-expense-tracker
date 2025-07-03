import React from "react";
import { LuBrain } from "react-icons/lu";
import jsPDF from "jspdf";
import ReactMarkdown from "react-markdown";
import { useInsights } from "../../context/InsightsContext";

function plainTextInsights(insights) {
  return insights
    .split(/\r?\n/)
    .map((line) =>
      line
        .replace(/^[*\s]+/, "")
        .replace(/\*+$/, "")
        .trim()
    )
    .filter(Boolean)
    .join("\n");
}

const markdownComponents = {
  h1: ({ ...props }) => (
    <h1
      className="text-2xl md:text-3xl font-bold text-purple-800 mt-7 mb-2"
      {...props}
    />
  ),
  h2: ({ ...props }) => (
    <h2
      className="text-xl md:text-2xl font-bold text-pink-500 mt-4 mb-2"
      {...props}
    />
  ),
  h3: ({ ...props }) => (
    <h3
      className="text-lg md:text-xl font-bold text-pink-400 mt-4 mb-2"
      {...props}
    />
  ),
  h4: ({ ...props }) => (
    <h4
      className="text-base md:text-lg font-semibold text-pink-300 mt-3 mb-1"
      {...props}
    />
  ),
  strong: ({ ...props }) => <strong className="text-purple-700" {...props} />,
  li: ({ ...props }) => <li className="mb-1" {...props} />,
};

const AIInsights = ({ onFetch }) => {
  const { insights, loadingInsights } = useInsights();
  const handleDownloadPDF = () => {
    if (!insights) return;
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("AI Insights", 10, 15);
    doc.setFontSize(12);
    const text = plainTextInsights(insights);
    doc.text(text, 10, 25);
    doc.save("ai-insights.pdf");
  };

  return (
    <div className="card bg-purple-50 border border-purple-200 p-5">
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 p-2 rounded-full shadow-lg animate-pulse">
            <LuBrain className="text-white text-3xl drop-shadow-lg" />
          </span>
          <h5 className="text-xl md:text-xl font-semibold text-purple-800">
            AI Insights
          </h5>
        </div>
        {!insights && !loadingInsights && (
          <button
            className="px-3 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg shadow-lg font-semibold text-base md:text-md flex items-center gap-2 hover:scale-105 hover:from-purple-600 hover:to-pink-600 transition-all duration-200"
            onClick={onFetch}
            title="Generate Insights"
          >
            <svg
              className="h-5 w-5 animate-bounce"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            <span className="hidden md:inline">Generate Insights</span>
          </button>
        )}
        {insights && !loadingInsights && (
          <div className="flex gap-2">
            <button
              className="px-3 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg shadow-md font-semibold text-base md:text-md flex items-center gap-2 hover:scale-105 hover:from-pink-600 hover:to-purple-600 transition-all duration-200 border-0 outline-none focus:ring-2 focus:ring-pink-300"
              onClick={onFetch}
              title="Generate Again"
            >
              <svg
                className="h-5 w-5 text-white animate-spin-slow"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              <span className="hidden md:inline">Generate Again</span>
            </button>
            <button
              className="px-3 py-2 bg-gradient-to-r from-purple-500 to-purple-700 text-white rounded-lg shadow-md font-semibold text-base md:text-md flex items-center gap-2 hover:scale-105 hover:from-purple-600 hover:to-purple-800 transition-all duration-200 border-0 outline-none focus:ring-2 focus:ring-purple-300"
              onClick={handleDownloadPDF}
              title="Download as PDF"
            >
              <svg
                className="h-5 w-5 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3"
                />
              </svg>
              <span className="hidden md:inline">Download PDF</span>
            </button>
          </div>
        )}
      </div>
      <div className="text-sm md:text-base text-gray-800 min-h-[10px] prose prose-purple max-w-none">
        {loadingInsights && (
          <div className="flex justify-center items-center min-h-[120px]">
            <span className="inline-flex items-center gap-2 text-purple-600 text-md md:text-lg font-semibold">
              <svg
                className="animate-spin h-6 w-6 mr-2 text-purple-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                ></path>
              </svg>
              Generating insights...
            </span>
          </div>
        )}
        {!loadingInsights && insights && (
          <ReactMarkdown components={markdownComponents}>
            {insights}
          </ReactMarkdown>
        )}
      </div>
    </div>
  );
};

export default AIInsights;
