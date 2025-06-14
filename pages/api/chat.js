// pages/api/chat.js

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { prompt } = req.body;

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    const message = completion.data.choices[0].message.content;
    res.status(200).json({ result: message });
  } catch (error) {
    res.status(500).json({ result: "Failed to fetch from OpenAI API" });
  }
}
