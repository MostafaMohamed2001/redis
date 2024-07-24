const express = require('express');
const axios = require('axios');
const 

const app = express();

// Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Hello, World!' });
});

app.get('/photos', (req, res) => {
  const users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' },
  ];

  res.json(users);
});

app.get('/users/:id', (req, res) => {
  
});



app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
