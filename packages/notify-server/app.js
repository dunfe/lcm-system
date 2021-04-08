const express = require("express");
const cors = require('cors');
const app = express();
app.use(cors());
const server = require("http").createServer(app);
const io = require("socket.io")(server);

server.listen(3007, () => {
    console.log('Server listening at port %d', 3007);
});

io.on('connection', (socket) => {
    socket.on('news', data => {
        socket.broadcast.emit('new', 5);
    })
});
