// api.js
const express = require('express');
const { OpenAIApi } = require('openai');

const app = express();
app.use(express.json());

app.post('/api/chat', async (req, res) => {
  try {
    const userInput = req.body.message;
    const openai = new OpenAIApi({ key: process.env.OPENAI_API_KEY });
    const response = await openai.complete({
      prompt: userInput,
      max_tokens: 50
    });

    res.json({ message: response.choices[0].text.trim() });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
