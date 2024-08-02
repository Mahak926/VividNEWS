import fetch from "node-fetch";
module.exports = async (req, res) => {
  try {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    if (req.method === "OPTIONS") {
      res.status(200).end();
      return;
    }
    const { query } = req.query;
    if (!query) {
      res.status(400).json({ error: "Query parameter is required" });
      return;
    }
//     const API_KEY = process.env.API_KEY;
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${query}&apiKey=91ec3761607c475381cc00d274402595`
    );
    if (!response.ok) {
      throw new Error(`News API request failed with status ${response.status}`);
    }
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error in /api/news:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
