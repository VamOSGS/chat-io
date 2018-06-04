import React, { Component } from 'react';

class OnlineUsers extends Component {
  render() {
    return (
      <div className={'onlineUsers'}>
        <h1>Online Users</h1>
        <ul>{this.props.users.map((obj, i) => <li key={i}>{obj.name}</li>)}</ul>
      </div>
    );
  }
}

export default OnlineUsers;
