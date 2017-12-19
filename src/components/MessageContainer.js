/**
 * Created by kevin on 10/12/17.
 */
import React, { Component } from 'react';

class MessageContainer extends Component {
  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: 'smooth' });
    // const scrollHeight = this.messagesDiv.scrollHeight;
    // const height = this.messagesDiv.clientHeight;
    // const maxScrollTop = scrollHeight - height;
    // this.messagesDiv.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    // console.log(
    //   `scrollHeight: ${scrollHeight}, height: ${height}, maxScrollTop: ${maxScrollTop}`,
    // );
  };

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  render() {
    const messages = this.props.messages;
    // console.log('messages: ' + messages);
    const listItems = messages.map((item, index) => {
      if (item.length < 500) {
        console.log('the message is text');
        return <li key={index}>{item}</li>;
      } else {
        console.log('the message is an image');
        return (
          <li key={index}>
            <img src={item} />
          </li>
        );
      }
    });

    return (
      <div>
        <div className="MessageContainer">
          <div className="MessagesList">
            <ul id="messages">{listItems}</ul>
          </div>
          <div
            style={{ float: 'left', clear: 'both' }}
            ref={el => {
              this.messagesEnd = el;
            }}
          />
        </div>
      </div>
    );
  }
}

export default MessageContainer;
