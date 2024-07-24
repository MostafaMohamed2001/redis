const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes


app.get('/photos', async(req, res) => {
  const albumId = req.params.albumId
  const { data } = await axios.get('https://jsonplaceholder.typicode.com/photos',
    {
      params:{albumId}
    }
  );
  console.log(data.length);
  res.send( data); 
});


app.get('/photos/:id', (req, res) => {
  const { data } = await axios.get(ttps://jsonplaceholder.typicode.com/photos`
  );
});
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
