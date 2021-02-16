import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import * as io from 'socket.io';
import { v4 as uuidV4 } from 'uuid';

const app = express();
const server = createServer(app); 
const socketio = new io.Server(server);
const port = process.env.PORT || 5000;

// const { PeerServer } = require('peer');
import {PeerServer} from 'peer';
const peerServer = PeerServer({ port: 9000, path: '/myapp' });

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/join', (req, res) => {
    res.send({ link: uuidV4() });
});

socketio.on('connection', socket => {
    console.log('socket established');

    socket.on('join-room', (userData) => {
        const { roomID, userID } = userData;

        socket.join(roomID);
        socket.to(roomID).broadcast.emit('new-user-connect', userData);

        socket.on('disconnect', () => {
            socket.to(roomID).broadcast.emit('user-disconnected', userID);
        });

        socket.on('broadcast-message', (message) => {
            socket.to(roomID).broadcast.emit('new-broadcast-messsage', {...message, userData});
        });

        socket.on('display-media', (value) => {
            socket.to(roomID).broadcast.emit('display-media', {userID, value });
        });

        socket.on('user-video-off', (value) => {
            socket.to(roomID).broadcast.emit('user-video-off', value);
        });
    });
});

// Server listen initilized
server.listen(port, () => {
    console.log(`Listening on the port ${port}`);
}).on('error', e => {
    console.error(e);
});