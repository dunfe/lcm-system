const cors = require('cors');
var express = require("express");
var app = express();

app.use(cors())
var server = require("http").Server(app);
var io = require("socket.io")(server);

server.listen(3007);

io.on('connection', (socket) => {
    console.log(socket);
});
