const http = require("http");

const server = http.createServer((req, res) => {
  if (req.method == 'GET' && req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });

    // Send the response body "Hello World"
    res.end('Hello World\n');
  } else if (req.method == 'POST' && req.url === '/') {
    
  } else if (req.method == 'PUT' && req.url === '/:id') {
    
  } else {
    
  }
});




server.listen(3000, () => {
  console.log("listening on port 3000");
});