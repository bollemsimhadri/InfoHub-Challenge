const express = require("express");
const cors = require("cors");
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();



const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3001;

app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));




const quotes = [
  { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
  { text: "Don’t watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
  { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", author: "Winston Churchill" },
  { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
  { text: "Dream big. Start small. Act now.", author: "Robin Sharma" },
  { text: "Your time is limited, so don’t waste it living someone else’s life.", author: "Steve Jobs" },
  { text: "It always seems impossible until it’s done.", author: "Nelson Mandela" },
  { text: "Hard work beats talent when talent doesn’t work hard.", author: "Tim Notke" },
  { text: "Don’t be pushed by your problems. Be led by your dreams.", author: "Ralph Waldo Emerson" },
  { text: "Act as if what you do makes a difference. It does.", author: "William James" }
];

app.get("/api/quote", (req, res) => {
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  res.json(randomQuote);
});



app.get("/api/weather", async (req, res) => {
  try {
    const city = req.query.city || "Hyderabad";
    const apiKey = process.env.WEATHER_API_KEY;

    console.log("API Key:", apiKey);

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    const { main, weather } = response.data;
    res.json({
      city,
      temperature: main.temp,
      condition: weather[0].description,
    });
  } catch (error) {
    console.error("Weather API Error:", error.response?.data || error.message);
    res.status(500).json({ error: "Could not fetch weather data" });
  }
});



app.get("/api/currency", async (req, res) => {
  try {
    const amount = parseFloat(req.query.amount) || 1;
    const response = await axios.get("https://api.exchangerate-api.com/v4/latest/INR");

    const usdRate = response.data.rates.USD;
    const eurRate = response.data.rates.EUR;

    res.json({
      inr: amount,
      usd: (amount * usdRate).toFixed(2),
      eur: (amount * eurRate).toFixed(2),
    });
  } catch (error) {
    res.status(500).json({ error: "Currency conversion failed" });
  }
});


