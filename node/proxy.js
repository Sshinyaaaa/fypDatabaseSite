const express = require('express');
import('node-fetch').then((module) => {
  const fetch = module.default;
  
  // Your code that uses fetch goes here
}).catch((error) => {
  console.error('Error importing node-fetch:', error);
});

const app = express();
const PORT = 3000;

const cors = require('cors');
app.use(cors()); // Enable CORS for all routes

// Define a route to proxy requests
app.post('/proxy', async (req, res) => {
  try {
    const response = await fetch('https://script.google.com/macros/s/AKfycbye3_QJromQ4BNebnRhDTkkZt7VkhilsaDWBm57bNoRvURl29tjWXZBF1L_vOOMJ0F6dg/exec', {
      method: 'POST',
      body: JSON.stringify(req.body), // Forward the request body
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    res.json(data); // Forward the response from the Google Apps Script web app
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server is running on http://localhost:${PORT}`);
});
