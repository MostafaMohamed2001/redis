const http = require("http");

const server = http.createServer((req, res) => {
  if(req.method == 'GET' )
});




server.listen(3000, () => {
  console.log("listening on port 3000");
});