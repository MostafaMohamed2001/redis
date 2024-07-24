const http = require("http");

const server = http.createServer((req, res) => {
  if (req.method == 'GET' && req.url === '/') {
    res.send("Hello wolrld")
  } else if (req.method == 'POST' && req.url === '/') {
    
  } else if (req.method == 'PUT' && req.url === '/:id') {
    
  } else {
    
  }
});




server.listen(3000, () => {
  console.log("listening on port 3000");
});