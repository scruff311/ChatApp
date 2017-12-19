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
      messages.push(inboundMessage.message);
      this.setState({ messages: messages });
    });
  }

  _handleFileUpload() {
    socket.on('file_upload_success', data => {
      console.log('file upload action was emitted', data.file);
      this.props.createMessage({
        room: this.props.room,
        newMessage: { user: data.user, image: data.file },
      });
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
    console.log('selected file:', ev.target.files[0]);
    this.setState({ file: ev.target.files[0] });
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
