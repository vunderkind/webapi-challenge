require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const server = require("./server.js");

port = process.env.PORT

server.listen(port, () => console.log(`Eavesdropping on ${port}`));