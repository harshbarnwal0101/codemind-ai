import React, { useState } from "react";

const App = () => {
  const [code, setCode] = useState("");
  const [review, setReview] = useState("");

  const handleReview = async () => {
    if (!code.trim()) {
      setReview("⚠️ Please enter some code to review.");
      return;
    }

    setReview("🧠 AI is reviewing your code...");

    try {
      const response = await fetch("https://codemind-backend-2tln.onrender.com/review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      });

      const data = await response.json();
      await new Promise((res) => setTimeout(res, 600));

      setReview(data.feedback || "❗ No feedback received.");
    } catch (error) {
      console.error("Review request failed:", error);
      setReview("❌ Error while fetching feedback.");
    }
  };

  return (
    <div className="min-h-screen bg-black text-green-400 p-8 font-mono">
      <h1 className="text-2xl font-bold mb-6 text-green-500">🛠️ AI Code Reviewer</h1>

      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Paste your code here..."
        className="w-full h-64 p-4 bg-[#0a0a0a] text-green-400 border border-green-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none mb-4 shadow-inner"
      />

      <button
        onClick={handleReview}
        className="bg-green-600 hover:bg-green-500 text-black font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
      >
        🚀 Review Code
      </button>

      {review && (
        <div className="mt-6 p-4 bg-[#0f0f0f] border border-green-700 rounded-lg whitespace-pre-wrap max-h-[60vh] overflow-auto text-green-300">
          {review}
        </div>
      )}
    </div>
  );
};

export default App;
