import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "./data/apiPath";
import { FaRupeeSign } from "react-icons/fa";




const CurrencyConverter = () => {
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const convertCurrency = async () => {
    if (!amount || isNaN(amount)) {
      setError("Please enter a valid number");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const res = await axios.get(`${API_URL}/api/currency?amount=${amount}`);
      setResult(res.data);
    } catch (err) {
      setError("Conversion failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-80 h-[350px] bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl flex flex-col justify-center items-center p-6 transition-transform hover:scale-[1.02]">
      <div className="w-full text-center">
        <h2 className="text-2xl font-semibold text-blue-600 mb-6">
          Currency Converter
        </h2>

        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount in INR"
          className="w-72 border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          onClick={convertCurrency}
          disabled={loading}
          className={`w-72 text-white mt-4 px-4 py-2 rounded-lg transition-all ${loading
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
            }`}
        >
          {loading ? "Converting..." : "Convert"}
        </button>

        {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
      </div>

      {result && !loading && (
        <div className="text-center mt-4">
          <p className="text-gray-700 font-medium mb-2 flex items-center justify-center gap-1">
            <FaRupeeSign />
            {amount} INR equals:
          </p>

          <p className="text-green-600 font-semibold text-lg">{result.usd} USD</p>
          <p className="text-indigo-600 font-semibold text-lg">{result.eur} EUR</p>
        </div>
      )}

    </div>
  );
};

export default CurrencyConverter;
