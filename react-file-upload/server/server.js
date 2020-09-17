const express = require("express");
const upload = require("./upload");
const callName = require("./callName");
const cors = require("cors");

const server = express();
const port = 8000;

var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200
};

server.use(cors(corsOptions));

server.post("/upload", upload);
server.get("/name", callName);

server.listen(port, () => {
  console.log("Server started!");
  console.log("server running on port:", port);
});
