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

//Get actions
server.get('/actions', (req, res)=> {
    action.get()
    .then(actions => {
        res.status(200).json(actions)
    })
    .catch(err => {
        err, console.log(err.message);
    }
        )
})

//GET projects
server.get('/projects', (req, res)=> {
    project.get()
    .then(project => {
        res.status(200).json(project)
    })
    .catch(err => {
        err, console.log(err.message);
    }
        )
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