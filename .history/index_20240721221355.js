const http = require("http");
const { v4: uuidv4 } = require("uuid");

let todos = [];
let nextId = 1;

const server = http.createServer();

server.on("request", async (req, res) => {
  console.log(req.method, req.url);

  if (req.url === "/todos") {
    console.log
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