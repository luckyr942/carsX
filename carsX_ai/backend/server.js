// server.js

import { GoogleGenAI } from "@google/genai";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// Default test route
app.get("/", (req, res) => {
  res.send("✅ Gemini API is running successfully!");
});

// Chat route
app.post("/api/carsX_AI", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "No message received" });
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash", // You can use "gemini-2.5-pro" for higher accuracy
      contents: [
        {
          role: "user",
          parts: [{ text: message }],
        },
      ],
    });

    // ✅ Extract text safely from new response format
    const reply =
      response.output?.[0]?.content?.[0]?.text ||
      response.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response generated";

      const formattedReply = aiReply.replace(/\n/g, "<br>");
    res.json({ reply: formattedReply });

    
  } catch (error) {
    console.error("🚨 Gemini API Error:", error);
    res.status(500).json({ error: "AI API failed", details: error.message });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
