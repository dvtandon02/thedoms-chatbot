
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const app = express();
const port = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

// ✅ INIT OpenAI with API key from environment
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// ✅ Endpoint for chatbot
app.post('/chat', async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required.' });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: message }],
    });

    const reply = completion.choices[0]?.message?.content;
    res.json({ reply });
  } catch (error) {
    console.error('🔥 OpenAI Error:', error);
    res.status(500).json({
      error: 'Error reaching OpenAI. Please try again later.',
      details: error.message,
    });
  }
});

app.get('/', (req, res) => {
  res.send('🤖 The Doms Chatbot is running!');
});

app.listen(port, () => {
  console.log(`✅ Chatbot server running on port ${port}`);
});
