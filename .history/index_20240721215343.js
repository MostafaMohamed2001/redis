const http = require("http");

const server = http.createServer((req, res) => {
  if (req.method == 'GET' && req.url === '/') {
    res.end('Hello World from get \n');
  } else if (req.method == 'POST' && req.url === '/') {
    res.end('Hello World from post \n');
  } else if (req.method == 'PUT' && pathname.startsWith('/todos/')) {
    const id = pathname.split('/')[2]; // Extract the ID from the URL
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(`Hello World from PUT for ID: ${id} \n`);
    res.end('Hello World from put \n');
  } else if (req.method == 'DELETE'  && pathname.startsWith('/todos/')) {
    res.end(`Hello World from delete for ID: ${id} \n`);
    res.end('Hello World from put \n');
  }
});




server.listen(3000, () => {
  console.log("listening on port 3000");
});