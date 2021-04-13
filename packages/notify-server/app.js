const express = require("express");
const cors = require('cors');
const app = express();
app.use(cors());
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const port = process.env.PORT || 3007
server.listen(port, () => {
    console.log('Server listening at port %d', port);
});

io.on('connection', (socket) => {
    socket.on('news', data => {
        socket.broadcast.emit('new', 5);
    })
});
