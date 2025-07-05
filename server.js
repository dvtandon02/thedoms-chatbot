const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { OpenAI } = require('openai');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const openai = new OpenAI({
  apiKey: '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'
});

app.post('/chat', async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: `You are a helpful assistant for The Doms — a digital agency combining AI tools and human creativity. You can answer freely like ChatGPT, but always use The Doms' offerings when users ask about services, pricing, or plans.`
        },
        { role: 'user', content: userMessage }
      ]
    });

    res.json({ reply: response.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
});

app.listen(3000, () => {
  console.log('✅ Chatbot server running on http://localhost:3000');
});
