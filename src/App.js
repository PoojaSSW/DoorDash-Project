import React, { Component } from 'react';
import ChatApp from './components/ChatApp';
import './styles/App.css';
import './styles/Login.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { username: '' };
    this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
    this.usernameSubmitHandler = this.usernameSubmitHandler.bind(this);
  }

  usernameChangeHandler(event) {
    this.setState({ username: event.target.value });
  }

  usernameSubmitHandler(event) {
    event.preventDefault();
    this.setState({ submitted: true, username: this.state.username });
  }

  render() {
    if (this.state.submitted) {
      // if username has been entered, show the ChatApp component
      return (
        <ChatApp username={this.state.username} />
      );
    }
    // main page on load
    return (
      <form onSubmit={this.usernameSubmitHandler} className="username-container">
        <div>
          <input
            type="text"
            onChange={this.usernameChangeHandler}
            placeholder="Type your username..."
            required />
        </div>
        <input type="submit" value="Join the DoorDash Chat!" />
      </form>
    );
  }
}

export default App;
