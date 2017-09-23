import React, {Component} from 'react';

class MessageBoard extends Component {
    render() {
        return (
            <ul ref={ ul => this.board = ul }>
                {this.props.messages.map((message, i) => <li key={i}>
                    <p>{message.message}</p>
                    <div className={'info'}>
                        <h2>{this.props.messages[i].user}</h2>
                        <span>{message.time}</span>
                    </div>
                </li>)}
            </ul>
        );
    }
}

export default MessageBoard;