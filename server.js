/**
 * Created by kevin on 10/12/17.
 */
const io = require('socket.io')();

io.on('connection', (socket) => {
    console.log('a user connected');
    
    // when the client emits the 'subscribeToTimer' event
    socket.on('subscribeToTimer', (interval) => {
        console.log('client is subscribing to timer with interval ', interval);
        setInterval(() => {
            // emit the 'timer' event every time it fires
            socket.emit('timer', new Date());
        }, interval);
    });

    socket.on('chat message', (msg) => {
        console.log('message: ' + msg.message);
        // broadcast the message back to the client
        socket.emit('new message', msg);
    });
    
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
});

io.on('connect', function (socket) {
    socket.on('message', function (message) {
        console.log('I received a message', message)
    })
});

const port = 8000;
io.listen(port);
console.log('listening on port ', port);