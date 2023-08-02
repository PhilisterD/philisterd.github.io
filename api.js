// api.js

const BASE_URL = 'https://api.openai.com/v1/chat/completions';  // ChatGPT API URL
const API_KEY = process.env.OPENAI_API_KEY;  // Access the environment variable

async function callChatGPT(prompt) {
  const data = {
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'system', content: 'You are a helpful assistant.' }, { role: 'user', content: prompt }]
  };

  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`  // Use the environment variable
      },
      body: JSON.stringify(data)
    });

    const responseData = await response.json();
    return responseData.choices[0].message.content;
  } catch (error) {
    console.error('Error calling ChatGPT API:', error);
    return 'An error occurred while processing your request.';
  }
}

export { callChatGPT };