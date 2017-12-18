/**
 * Created by kevin on 10/12/17.
 */
import React, {Component} from 'react';

class MessageContainer extends Component {
    render() {
        const messages = this.props.messages
        // console.log('messages: ' + messages);
        const listItems = messages.map((text, index) =>
            <li key={index}>{text}</li>
        );
        return (
            <ul id="messages">
                {listItems}
            </ul>
        );
    }
}

export default MessageContainer;