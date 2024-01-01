let moment = require('moment');
let express = require('express');
let http = require('http');

let app = express();
let server = http.createServer(app);

let io = require('socket.io')(server); 
let path = require('path');
app.use(express.static(path.join(__dirname, './public')));

app.get('/', (req, res) => {
  res.sendFile(dirname + '/public/index.html');
});

let name;

io.on('connection', (socket) => {
  let now = moment().format('h:mm a'); 
  console.log('new user connected -', now);

  socket.on('joining msg', (username) => {

    name = username.toUpperCase();
    io.emit('chat message', `___ ${name} has joined the chat ___`);
  });

  socket.on('disconnect', () => {
    let now = moment().format('h:mm a'); console.log('user disconnected -', now);
    io.emit('chat message', `___ ${name} has left the chat ___`);

  });
  socket.on('chat message', (msg) => {
    socket.broadcast.emit('chat message', msg);
  });
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log('Server listening on :3000');
});
