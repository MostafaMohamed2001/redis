const express = require('express');
const axios = require('axios');
const cors = require('cors');
const redis = require('redis');
const redisClint = redis.createClient();

const { promisify } = require('util');

const app = express();


const defExp = 3600;
// Middleware
app.use(express.json());
app.use(cors());

// Routes
redisClint.on('error', (err) => {
  console.error('Redis client error:', err);
});

redisClint.connect().then(() => {
  console.log('Connected to Redis');
});


// Promisify the `keys` method for use with async/await
const keysAsync = promisify(redisClint.keys).bind(redisClint);

app.get('/photos', async (req, res) => {
  try {
    // Fetch all keys from Redis
    const keys = await keysAsync('*'); // Use pattern '*' to fetch all keys
    console.log('Keys in Redis:', keys);

    // Send keys as response (optional)
    res.json(keys);
  } catch (error) {
    console.error('Error fetching keys:', error);
    res.status(500).send('Internal Server Error');
  } finally {
    // Optionally, close the Redis client if you do not need it anymore
    // redisClient.quit();
  }
});

app.get('/photos/:id', async(req, res) => {
  const { data } = await axios.get(`https://jsonplaceholder.typicode.com/photos/${req.params.id}`
  );
  res.send(data)
});
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});