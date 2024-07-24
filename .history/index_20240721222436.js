const http = require("http");
const { v4: uuidv4 } = require("uuid");

let todos = [];
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

       

      case "POST":
        let postData = await getRequestBody(req);
        let newTodo = { id: nextId++, text: postData.text };
        todos.push(newTodo);
        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify(newTodo));
        break;

      case "PUT":
        let putData = await getRequestBody(req);
        let todoToUpdate = todos.find((todo) => todo.id === putData.id);
        if (todoToUpdate) {
          todoToUpdate.text = putData.text;
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify(todoToUpdate));
        } else {
          res.writeHead(404, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "ToDo item not found" }));
        }
        break;

      case "DELETE":
        let deleteData = await getRequestBody(req);
        let index = todos.findIndex((todo) => todo.id === deleteData.id);
        if (index !== -1) {
          todos.splice(index, 1);
          res.writeHead(204);
          res.end();
        } else {
          res.writeHead(404, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "item not found" }));
        }
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