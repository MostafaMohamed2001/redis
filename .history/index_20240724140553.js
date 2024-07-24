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

redisClient.connect().then(() => {
  console.log('Connected to Redis');
});


const setDateToRedis = async (req, res, url, getsetParam, expdate) => {
  try {
    console.log("Checking Redis for key:", getsetParam);
    const data = await redisClient.get(getsetParam);

    if (data) {
      console.log("Data found in Redis");
      return res.json(JSON.parse(data));
    } else {
      let response;

      // Determine the correct API endpoint based on request parameters
      if (req.query.albumId) {
        response = await axios.get(url, { params: { albumId: req.query.albumId } });
      } else if (req.params.id) {
        response = await axios.get(`https://jsonplaceholder.typicode.com/photos/${req.params.id}`);
      } else {
        response = await axios.get(url);
      }

      // Cache the data in Redis
      await redisClient.setEx(getsetParam, expdate, JSON.stringify(response.data));
      console.log("Data fetched from API and cached");
      return res.json(response.data);
    }
  } catch (err) {
    console.error('Error fetching data:', err);
    return res.status(500).send('Error fetching data');
  }
};

app.get('/photos', async (req, res) => {
  const { albumId } = req.query;
  const getsetParam = albumId ? `photos?albumId=${albumId}` : 'photos';
  await setDateToRedis(req, res, 'https://jsonplaceholder.typicode.com/photos', getsetParam, defExp);
});

app.get('/photos/:id', async (req, res) => {
  try {
  
    const data = await redisClint.get(`photos:${req.params.id}`);
    if (data) {
      console.log("from redies")
      res.json(JSON.parse(data))
    } else {
      console.log("from axios")
      const { data } = await axios.get(`https://jsonplaceholder.typicode.com/photos/${req.params.id}`);
      redisClint.setEx(`photos:${req.params.id}`, defExp, JSON.stringify(data));
      res.json(data)
    }

  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).send('Error fetching data');
    return;
  }
});
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
