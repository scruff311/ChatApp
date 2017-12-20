/**
 * Created by kevin on 10/13/17.
 */
import React, { Component } from 'react';
import io from 'socket.io-client';
import MessageContainer from './MessageContainer';
import InputContainer from './InputContainer';

// const socket = io('http://localhost:8000');
const socket = io();

class ChatContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      file: {},
      // messages: props.messages
      messages: [],
    };

    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnImageChange = this.handleOnImageChange.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this._handleMessageEvent = this._handleMessageEvent.bind(this);
    this._handleFileUpload = this._handleFileUpload.bind(this);
  }

  componentDidMount() {
    console.log('did mount');
    this._handleFileUpload();
    this._handleMessageEvent();
  }

  // this handles the client.emit() call on the server
  _handleMessageEvent() {
    socket.on('new message', inboundMessage => {
      console.log('new message: ' + inboundMessage.message);
      const messages = this.state.messages;
      const msg = {
        type: 'text',
        message: inboundMessage.message,
      };
      messages.push(msg);
      this.setState({ messages: messages });
    });
  }

  _handleFileUpload() {
    socket.on('new base64 file', inboundMessage => {
      console.log(`new image: ${inboundMessage.fileName}`);
      const messages = this.state.messages;
      const msg = {
        type: 'image',
        message: inboundMessage.previewURL,
      };
      messages.push(msg);
      this.setState({ messages: messages });
    });
  }

  handleOnChange(ev) {
    // console.log("input change: " + ev.target.value)
    this.setState({ input: ev.target.value });
  }

  handleOnSubmit(ev) {
    ev.preventDefault();
    console.log('on submit: ' + this.state.input);
    socket.emit('chat message', { message: this.state.input });
    this.setState({ input: '' });
  }

  handleOnImageChange(ev) {
    const file = ev.target.files[0];
    console.log('selected file: ', file);
    let reader = new FileReader();
    reader.onloadend = () => {
      const msg = {
        file: file,
        fileName: file.name,
        previewURL: reader.result,
      };
      socket.emit('base64 file', msg);
    };
    reader.readAsDataURL(file);
  }

  render() {
    return (
      <div className="ChatContainer">
        <MessageContainer messages={this.state.messages} />
        <InputContainer
          changeHandler={this.handleOnChange}
          submitHandler={this.handleOnSubmit}
          imageHandler={this.handleOnImageChange}
          input={this.state.input}
        />
      </div>
    );
  }
}

export default ChatContainer;
