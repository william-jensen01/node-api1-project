// write the server here and export it
const User = require('./user-model');
const express = require('express');
const server = express();

server.use(express.json());

// HTTP METHOD, PATH

// GET /
server.get('/', (req, res) => {
    res.send('hello')
});

// GET /api/users
server.get('/api/users', async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(201).json(users);
    } catch (err) {
        res.status(500).json({ errorMessage: "the users information could not be retrieved." })
    }
});
server.get('/api/users/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findById(id)
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: "The user with the specified ID does not exist."})
        }
    } catch (err) {
        res.status(500).json({ errorMessage: "The user information could not be retrieved" })
    }
});
server.post('/api/users', async (req, res) => {
    const user = req.body;

    if (!user.name || !user.bio) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    }

    try {
        const newlyCreatedUser = await User.create(user)
        console.log(newlyCreatedUser);
        res.status(201).json(newlyCreatedUser)
    } catch (err) {
        res.status(500).json({ errorMessage: "There was an error while saving the user to the database" })
    }
});

module.exports = server;