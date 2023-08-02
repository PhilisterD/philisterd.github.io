// server.js

const express = require('express');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;  // Set your desired port number

// Middleware to parse JSON in request body
app.use(express.json());

// ChatGPT API endpoint
const BASE_URL = 'https://api.openai.com/v1/chat/completions';
const API_KEY = process.env.OPENAI_API_KEY;

app.post('/api/chat', async (req, res) => {
  const prompt = req.body.prompt;

  const data = {
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'system', content: 'You are a helpful assistant.' }, { role: 'user', content: prompt }]
  };

  try {
    const response = await axios.post(BASE_URL, data, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      }
    });

    const responseData = response.data;
    const content = responseData.choices[0].message.content;
    res.json({ response: content });
  } catch (error) {
    console.error('Error calling ChatGPT API:', error);
    res.status(500).json({ error: 'An error occurred while processing your request.' });
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});