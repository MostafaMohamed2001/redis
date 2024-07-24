const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Hello, World!' });
});

app.get('/photos', async(req, res) => {
 
  await axios.

});

app.get('/users/:id', (req, res) => {
  
});



app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
