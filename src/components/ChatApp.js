import React, { Component } from 'react';
import  api from '../api.js';
import Messages from './Messages';
import ChatInput from './ChatInput';
import '../styles/ChatApp.css';

class ChatApp extends Component {
  componentWillMount() {
    this.loadHelpContent();
    clearInterval(this.interval);
  }
  componentDidMount() {
    this.interval = setInterval(() => this.setState({ timeSpent: ++this.state.timeSpent }), 60000);
  }
  constructor(props) {
    super(props);
      this.state = {
        rooms: [],
        messages:[],
        roomDetails:{},
        timeSpent:0,
        clicked: null
      };
  }
  loadHelpContent() {
    return fetch(api.url +"/rooms").then(function(response){ return response.json(); }).then(data => {
      this.setState({rooms: data});
    });
  }
  sendHandler(details, message) {
    const messageObj = {
      name: this.props.username,
      message
    };
    messageObj.myMessage = true;
    fetch(api.url+'/rooms/'+details.id+'/messages', {
      method: 'POST',
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify(messageObj),

    }).then(function(response){ return response.json(); }).then(res => {
      return res;
    }).catch(err => err);
    this.addMessage(messageObj);
  }

  addMessage(message) {
    const messages = this.state.messages;
    messages.push(message);
    this.setState({ messages });
  }
  getRoomDetails(id) {
    return fetch(api.url+'/rooms/'+id).then(function(response){ return response.json(); }).then(roomDetails => {
      this.setState({ roomDetails:roomDetails });
    });
  }
  getRoomMessages(id) {
    this.getRoomDetails(id);
    return fetch(api.url+'/rooms/'+id+'/messages').then(function(response){ return response.json(); }).then(messages => {
      this.setState({ messages:messages, clicked: id});
    });
  }
  render() {
    const { messages,timeSpent,rooms,roomDetails,clicked } = this.state;
    return (
      <div className="containers">
        <div className="left-container">
          <div className="sub-cont">
            <p className="username-cont">{this.props.username}</p>
            <p className="online">Online for {timeSpent} minutes</p>
          </div>
          {rooms.length>0 && rooms.map((room) => {
            return (
              <div className="room-cont"key={room.id}>
                <div className={clicked===room.id ? "active":"inactive"} onClick={this.getRoomMessages.bind(this,room.id)}><span className="room-name-style">{room.name}</span></div>
              </div>
            )
          })}
        </div>
        {messages.length > 0 ?
        <div className="right-container">
          <div className="room-info">
            <div className="room-name">{roomDetails.name}</div>
            <div className="all-users-name">
              <span className="login-user">{this.props.username}</span>
              {roomDetails && roomDetails.users &&roomDetails.users.map(function(user){
                return <span key={user}className="user-style">, {user}</span>
              })}
            </div>
          </div>
          <div className="messages-cont"><Messages messages={messages} /></div>
          <ChatInput onSend={this.sendHandler.bind(this,roomDetails)} />
        </div> :<div className="empty-message">Please select a room to enter or view messages</div>
      }
      </div>
    );
  }
}

export default ChatApp;
