const express = require("express");

const server = express();

const actionsRouter = require("./actions/actionsRouter.js");
const projectRouter = require("./projects/projectsRouter.js");


server.use(express.json());
server.use(logger);
server.use("/actions", actionsRouter);
server.use("/projects", projectRouter);

// Simple get request to handle '/' requests
server.get('/', (req, res)=>{
    res.status(200).send("<img src=https://media3.giphy.com/media/1SRaXI2J1o7vO/giphy.gif>")
})


// Logger middleware
function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get(
      "host"
    )}`
  );
  next();
}

module.exports = server;