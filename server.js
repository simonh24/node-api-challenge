const express = require("express");

const projectRouter = require("./data/helpers/projectRouter.js");
const actionRouter = require("./data/helpers/actionRouter.js");

const server = express();

server.use(express.json());
server.use(logger)

server.get("/", (req, res) => {
    res.send("hello");
});

function logger(req, res, next) {
    console.log(`${new Date().toISOString()} || ${req.method} to ${req.url}`);
    next();
};

server.use("/api/projects", projectRouter);
server.use("/api/actions", actionRouter);

module.exports = server;