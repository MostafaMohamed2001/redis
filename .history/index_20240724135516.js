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


const setDateToRedis = async( url , getParam ) => {
  try {
    console.log("from redies")
    const data = await redisClint.get(getParam);
    if (data) {
      res.json(JSON.parse(data))
    } else {
      
      const { data } = await axios(url,
        {params : {albumId}}
      );
      redisClint.setEx(``, defExp, JSON.stringify(data));
      res.json(data)
    }

  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).send('Error fetching data');
    return;
  }
}


app.get('/photos', async (req, res) => {  
  const { albumId } = req.query;
  try {
    console.log("from redies")
    const data = await redisClint.get(`photos?albumId=${albumId}`);
    if (data) {
      res.json(JSON.parse(data))
    } else {
      console.log("from axios")
      const { data } = await axios('https://jsonplaceholder.typicode.com/photos',
        {params : {albumId}}
      );
      redisClint.setEx(`photos?albumId=${albumId}`, defExp, JSON.stringify(data));
      res.json(data)
    }

  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).send('Error fetching data');
    return;
  }

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
