import React, { Component } from 'react';
import { subscribeToTimer } from './api';
// import logo from './logo.svg';
import './App.css';
import ChatContainer from './components/ChatContainer'

class App extends Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     timestamp: 'no timestamp yet'
        // };
        // subscribeToTimer((err, timestamp) => this.setState({
        //     timestamp
        // }));
    }

    render() {
        return (
            <div className="App">
                <ChatContainer />
            </div>
        );
    }
}

export default App;
