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

app.get('/photos', async(req, res) => {  
  redisClint.get('photo', (err, photo) => {
    if (err) {
      console.log(err);
    }
    if(photo != null)
  })
  const { data } = await axios.get('https://jsonplaceholder.typicode.com/photos'
  );
  await redisClint.setEx('photo', defExp, JSON.stringify(data));
  res.send( data); 
});


app.get('/photos/:id', async(req, res) => {
  const { data } = await axios.get(`https://jsonplaceholder.typicode.com/photos/${req.params.id}`
  );
  res.send(data)
});
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
