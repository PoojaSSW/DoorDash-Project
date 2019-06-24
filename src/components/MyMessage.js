import React, { Component } from 'react';

class MyMessage extends Component {

  render() {
    // myMessage reprsents message sent by current loggedin user
    const myMessage = this.props.myMessage ? 'my-message' : '';

    return (
      <div className={`message ${myMessage}`}>

        <div className='message-body'>
          { this.props.message }
        </div>
        <div className='username'>
          { this.props.username }
        </div>
      </div>
    );
  }
}

MyMessage.defaultProps = {
  message: '',
  username: '',
  myMessage: false
};

export default MyMessage;
