const http = require("http");

const server = http.createServer((req, res) => {
  if (req.method == 'GET' && req.url === '/') {

  } else if (req.method == 'POST' && req.url === '/') {
    
  }E
});




server.listen(3000, () => {
  console.log("listening on port 3000");
});