require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const server = express();

server.use(express.json());

port = process.env.PORT

// Simple get request to handle '/' requests
server.get('/', (req, res)=>{
    res.status(200).send("<img src=https://media3.giphy.com/media/1SRaXI2J1o7vO/giphy.gif>")
})


server.listen(port, ()=>{
    console.log(`Server eavesdropping on your activities on ${port}`)
})