const express = require('express');

const app = express();

const user = require('./src/Users/routes/user');
app.use(express.json());
app.use(user);


const port = 3000;
const server = app.listen(port, () => console.log(`Listening on port ${port}...`));

module.exports = server;