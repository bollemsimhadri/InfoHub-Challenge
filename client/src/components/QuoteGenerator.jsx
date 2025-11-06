import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "./data/apiPath";

const QuoteGenerator = () => {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchQuote = async () => {
    try {
      setLoading(true);
      await new Promise((r) => setTimeout(r, 800)); // optional delay for effect
      const response = await axios.get(`${API_URL}/api/quote`);
      setQuote(response.data);
    } catch (error) {
      console.error("Error fetching quote:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-80 h-[330px] bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl flex flex-col justify-center items-center p-5 transition-transform hover:scale-[1.02]">
      <div className="text-center w-full">
        <h2 className="text-2xl font-semibold text-indigo-600 mb-4">
          Quote Generator
        </h2>

        {quote ? (
          <div>
            <div className="italic text-gray-700 mb-3 px-3">“{quote.text}”</div>
            <p className="text-sm text-gray-500 mb-4">
              — {quote.author || "Unknown"}
            </p>
          </div>
        ) : (
          <p className="text-gray-400 italic mb-3">
            Click below to get inspired
          </p>
        )}
      </div>

   
      <button
        onClick={fetchQuote}
        disabled={loading}
        className={`w-72 text-white mt-2 px-4 py-2 rounded-lg transition-all ${
          loading
            ? "bg-indigo-300 cursor-not-allowed"
            : "bg-indigo-500 hover:bg-indigo-600"
        }`}
      >
        {loading ? "Loading..." : "Generate Quote"}
      </button>

      <p className="text-xs text-gray-400 mt-3">
        Refresh anytime for a new quote
      </p>
    </div>
  );
};

export default QuoteGenerator;
