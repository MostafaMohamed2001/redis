const http = require("http");
const { v4: uuidv4 } = require("uuid");

let todos = [{
  id: 1,
  text:"ali"
},
  {
  
}];
let nextId = 1;

const server = http.createServer();

server.on("request", async (req, res) => {
  console.log(req.method, req.url);

  if (req.url === "/todos") {
    switch (req.method) {
      case "GET":
        res.writeHead(200, { "Content-Type": "application/json" });

        res.end(JSON.stringify(todos));

        break;

        default:
            res.writeHead(404);
            res.end("Not Found");


    }
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route not found" }));
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


async function getRequestBody(req) {
    return new Promise((resolve, reject) => {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });
      req.on("end", () => {
        try {
          if (body) {
            resolve(JSON.parse(body));
          } else {
            resolve({});
          }
        } catch (err) {
          reject(err);
        }
      });
      req.on("error", (err) => {
        reject(err);
      });
    });
  }