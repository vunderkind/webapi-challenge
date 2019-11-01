require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const project = require('./data/helpers/projectModel');
const action = require('./data/helpers/actionModel');

const server = express();

server.use(express.json());

port = process.env.PORT

// Simple get request to handle '/' requests
server.get('/', (req, res)=>{
    res.status(200).send("<img src=https://media3.giphy.com/media/1SRaXI2J1o7vO/giphy.gif>")
})

// GET/READ Project data by id
server.get('/projects/:id', (req, res)=>{
        const id = req.params.id;
        project.get(id)
        .then(results =>
            res.status(200).json(results)
        )
})

//To-do: refactor code so it uses routers

server.listen(port, ()=>{
    console.log(`Server eavesdropping on your activities on ${port}`)
})