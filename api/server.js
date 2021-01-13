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
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
});

module.exports = server;