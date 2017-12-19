import React, { Component } from 'react';
import io from 'socket.io-client';

const socket = io();
// const socket = io();

class TimeTest extends Component {
  constructor(props) {
    super(props);
    this.subscribeToTimer((err, timestamp) => this.setState({ 
      time: timestamp
    }));
  }

  state = {
    time: 'test',
  };

  subscribeToTimer(cb) {
    // subscribe to the 'timer' event coming from the server
    socket.on('timer', timestamp => cb(null, timestamp));
    // emit the 'subscribeToTimer' event
    socket.emit('subscribeToTimer', 1000);
  }

  render() {
    return <p>Server time: {this.state.time}</p>;
  }
}

export default TimeTest;
