/**
 * Created by kevin on 10/12/17.
 */
import io from 'socket.io-client';

const socket = io('http://localhost:8000');

export function subscribeToTimer(cb)
{
    // subscribe to the 'timer' event coming from the server
    socket.on('timer', timestamp => cb(null, timestamp));
    // emit the 'subscribeToTimer' event
    socket.emit('subscribeToTimer', 1000);
}