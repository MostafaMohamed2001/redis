const express = require('express');
const app = express();

// Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Hello, World!' });
});

app.get('/users', (req, res) => {
  const users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' },
  ];

  res.json(users);
});

app.get('/users/:id', (req, res) => {
  const { id } = req.params;
  const user = users.find((user) => user.id === parseInt(id));

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.json(user);
});
