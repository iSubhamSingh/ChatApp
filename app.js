var moment = require('moment');
var express = require('express');
var http = require('http');

var app = express();
var server = http.createServer(app);

var io = require('socket.io')(server); 
var path = require('path');
app.use(express.static(path.join(__dirname, './public')));

app.get('/', (req, res) => {
  res.sendFile(dirname + '/public/index.html');
});

var name;

io.on('connection', (socket) => {
  var now = moment().format('h:mm a'); 
  console.log('new user connected -', now);

  socket.on('joining msg', (username) => {

    name = username.toUpperCase();
    io.emit('chat message', `___ ${name} has joined the chat ___`);
  });

  socket.on('disconnect', () => {
    var now = moment().format('h:mm a'); console.log('user disconnected -', now);
    io.emit('chat message', `___ ${name} has left the chat ___`);

  });
  socket.on('chat message', (msg) => {
    socket.broadcast.emit('chat message', msg);
  });
});

server.listen(8000, () => {
  console.log('Server listening on :8000');
});
