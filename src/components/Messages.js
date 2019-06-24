import React from 'react';
import MyMessage from './MyMessage';
class Messages extends React.Component {

  componentDidUpdate() {
    // For scrolling to the bottom when new message is typed
    const objDiv = document.getElementById('messageList');
    objDiv.scrollTop = objDiv.scrollHeight;
  }
  render() {
    const messages = this.props.messages.map((message, i) => {
        return (
          <MyMessage
            key={i}
            username={message.name}
            message={message.message}
            myMessage={message.myMessage} />
        );
    });
    return (
      <div className='messages' id='messageList'>
        { messages }
      </div>
    );
  }
}

Messages.defaultProps = {
  messages: []
};
export default Messages;
