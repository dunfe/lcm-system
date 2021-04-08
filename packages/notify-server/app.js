var express = require("express");
var app = express();
var mongoose = require('mongoose');
//import {countNotify} from '../api/controller/mentor.js'

var server = require("http").Server(app);
var io = require("socket.io")(server);
mongoose.connect('mongodb+srv://admin:BbYS998aXvXRWgA@cluster0.okide.mongodb.net/lcm-system?authSource=admin&replicaSet=atlas-o7m3fo-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true', {
  auth: {
      user: 'admin',
      password: 'BbYS998aXvXRWgA'
  },
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to mongoDB');
  server.listen(3007);
})
  .then(() => console.log('server running on port 3007'))
  .catch(err => console.log(err.message));
