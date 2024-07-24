const http = require("http");
const url = require("url");

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const method = req.method;

  if (method === 'GET' && pathname === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World from GET \n');
  } else if (method === 'POST' && pathname === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World from POST \n');
  } else if (method === 'PUT' && pathname.startsWith('/todos/')) {
    const id = pathname.split('/')[2]; // Extract the ID from the URL
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(`Hello World from PUT for ID: ${id} \n`);
  } else if (method === 'DELETE' && pathname.startsWith('/todos/')) {
    const id = pathname.split('/')[2]; // Extract the ID from the URL
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(`Hello World from DELETE for ID: ${id} \n`);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found \n');
  }
});

server.listen(3000, () => {
  console.log("Listening on port 3000");
});
