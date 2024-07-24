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

const getAsync = promisify(redisClint.get).bind(redisClient);
const setExAsync = promisify(redisClint.setex).bind(redisClient);

// const defExp = 3600; // Default expiration time in seconds

app.get('/photos', async (req, res) => {
  try {
    // Try to get data from Redis
    const photo = await getAsync('photo');
    
    if (photo) {
      // If data exists in Redis, return it
      console.log('Data from cache');
      return res.json(JSON.parse(photo));
    } else {
      // Fetch data from API
      const { data } = await axios.get('https://jsonplaceholder.typicode.com/photos');
      // Store data in Redis
      await setExAsync('photo', defExp, JSON.stringify(data));
      console.log('Data from API');
      // Return the fetched data
      return res.json(data);
    }
  } catch (error) {
    // Handle errors
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
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
