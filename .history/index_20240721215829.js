const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {



  const parsedUrl = url.parse(req.url, true);
  console.log(parsedUrl);
  
  const pathname = parsedUrl.pathname;
  const method = req.method;
  
  // Extract ID if present in the URL
  const pathParts = pathname.split('/');
  const id = pathParts[1] || null;

  if (method === 'GET' && pathname === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World from GET \n');
  } else if (method === 'POST' && pathname === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World from POST \n');
  } else if (method === 'GET' && id) {
    // Handle GET request for a specific ID
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(`Hello World from GET for ID: ${id} \n`);
  } else if (method === 'PUT' && id) {
    // Handle PUT request for a specific ID
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(`Hello World from PUT for ID: ${id} \n`);
  } else if (method === 'DELETE' && id) {
    // Handle DELETE request for a specific ID
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(`Hello World from DELETE for ID: ${id} \n`);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found \n');
  }
});

server.listen(3000, () => {
  console.log('Listening on port 3000');
});
