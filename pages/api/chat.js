// pages/api/chat.js

export default async function handler(req, res) {
  const { message } = req.body;

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`, // Use .env.local for your key
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: message
          }
        ]
      })
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "No response from AI.";

    res.status(200).json({ reply });
  } catch (error) {
    res.status(500).json({ error: error.message });

import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, // Loaded from .env.local
});

const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Only allow POST
  }

  const { prompt } = req.body; // Get user input

  try {
    // Call ChatGPT API
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo', // Use ChatGPT model
      messages: [{ role: 'user', content: prompt }],
    });

    // Extract reply
    const message = completion.data.choices[0].message.content;
    res.status(200).json({ result: message });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ result: 'Failed to fetch from OpenAI API' });

  }
}
