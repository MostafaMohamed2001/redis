const express = require('express');
const axios = require('axios');
const cors = require('cors');
const redis = require('redis');
const redisClint = redis.createClient();


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



app.get('/photos', async (req, res) => {
  try {
    // Fetch all keys from Redis
    const keys = await redisClint.keys('*'); // Use pattern '*' to fetch all keys
    console.log('Keys in Redis:', keys);
    redisClint.getEx('photo', (err, data)=>{
      if (err) return err;
      if
    })

    // Send keys as response (optional)
    res.json(keys);
  } catch (error) {
    console.error('Error fetching keys:', error);
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
