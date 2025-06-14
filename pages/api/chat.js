// pages/api/chat.js

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  const { message, prompt } = req.body;
  const useVia = req.query.via || "openrouter"; // default: openrouter

  try {
    // ✅ OPTION A: OPENROUTER via fetch()
    if (useVia === "openrouter") {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "openai/gpt-3.5-turbo",
          messages: [{ role: "user", content: message }]
        })
      });

      const data = await response.json();
      const reply = data.choices?.[0]?.message?.content || "No response from OpenRouter";
      return res.status(200).json({ reply });
    }

    // ✅ OPTION B: OpenAI SDK
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    const reply = completion.data.choices[0].message.content;
    return res.status(200).json({ reply });

  } catch (error) {
    console.error("Chat API error:", error.message);
    res.status(500).json({ error: "Failed to generate response" });
  }
}
