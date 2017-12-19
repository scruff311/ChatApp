/**
 * Created by kevin on 10/12/17.
 */
'use strict';

const express = require('express');  
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
// const socketIO = require('socket.io');
const path = require('path');

const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, '/public/index.html');
console.log('index path: ' + INDEX);

// const server = express()
//   .use((req, res) => res.sendFile(INDEX))
//   .listen(PORT, () => console.log(`Listening on ${PORT}`));

// const io = socketIO(server);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/build')));

app.get('/', (req, res) => {
  res.sendFile(INDEX);
});

io.on('connection', socket => {
  console.log('a user connected');

  // when the client emits the 'subscribeToTimer' event
//   socket.on('subscribeToTimer', interval => {
//     console.log('client is subscribing to timer with interval ', interval);
//     setInterval(() => {
//       // emit the 'timer' event every time it fires
//       socket.emit('timer', new Date());
//     }, interval);
//   });

  socket.on('chat message', msg => {
    console.log('message: ' + msg.message);
    // broadcast the message back to the client
    socket.emit('new message', msg);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

io.on('connect', socket => {
  socket.on('message', message => {
    console.log('I received a message', message);
  });
});

// setInterval(() => io.emit('time', new Date().toTimeString()), 1000);

// const port = 8000;
// io.listen(port);
// console.log('listening on port ', port);
http.listen(PORT, () => {
  console.log('listening on port ' + PORT);
});
