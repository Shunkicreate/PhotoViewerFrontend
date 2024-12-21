import { createRequestHandler } from '@remix-run/express';
import express from 'express';
import fetch from 'node-fetch';

// notice that the result of `remix vite:build` is "just a module"
import * as build from './build/server/index.js';

const app = express();
app.use(express.static('build/client'));

// Add specific endpoint for GET request
app.get('/api/files/random', async (req, res) => {
  const COUNT = 16;
  const WIDTH = Math.floor(1920 / 4);
  const HEIGHT = Math.floor(1080 / 4);
  try {
    const response = await fetch(`http://192.168.11.65:8082/top-photos?count=${COUNT}&width=${WIDTH}&height=${HEIGHT}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Failed to fetch files' });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching files:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// and your app is "just a request handler"
app.all('*', createRequestHandler({ build }));

app.listen(3001, () => {
  console.log('App listening on http://localhost:3001');
});
