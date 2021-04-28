const config = require('./config');
const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const { videoToken, roomToken } = require('./tokens');
const cors = require('cors');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(pino);
app.use(cors());

const sendTokenResponse = (token, res) => {
    res.set('Content-Type', 'application/json');
    res.send(
        JSON.stringify({
            token: token.toJwt(),
            room_type: 'peer-to-peer'
        })
    );
};

app.get('/api/greeting', (req, res) => {
    const name = req.query.name || 'World';
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});

app.get('/video/token', (req, res) => {
    const identity = req.query.identity;
    const room = req.query.room;
    const token = videoToken(identity, room, config);
    sendTokenResponse(token, res);
});

app.post('/room/token', (req, res) => {
    const user_identity = req.body.user_identity;
    const room_name = req.body.room_name;
    const token = roomToken(user_identity, room_name, true, true);
    sendTokenResponse(token, res);
});

app.post('/video/token', (req, res) => {
    const identity = req.body.identity;
    const room = req.body.room;
    const token = videoToken(identity, room, config);
    sendTokenResponse(token, res);
});

app.listen(3006, () =>
    console.log('Express server is running on localhost:3006')
);
