const express = require('express');
const axios = require('axios');
const cors = require('cors');
const redis = require('res')
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes


app.get('/photos', async(req, res) => {
 
  const { data } = await axios.get('https://jsonplaceholder.typicode.com/photos'
  );
  console.log(data.length);
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
