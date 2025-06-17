import Server from "lume/core/server.ts";

const server = new Server({
  root: "./files",
});

server.start();

console.log("Server is running at http://localhost:8000");
