const express = require('express');
const expressWs = require('express-ws');
const app = express();
expressWs(app);
const port = 8080;

const cors = require('cors');
const mongoose = require('mongoose');

const config = require('./config');
const users = require('./router/Users');
const chat = require('./router/Chats');

app.use(cors());
app.use(express.json());

const run = async () => {
    await mongoose.connect(config.database, config.options);
    app.use('/users', users);
    app.use('/chat', chat);
    app.listen(port)
};

run().catch(e => {
    console.error(e)
});

