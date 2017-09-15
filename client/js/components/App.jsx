import React, {Component} from 'react';

class App extends Component {
    constructor(props) {
        super(props);
        this.handleSend = this.handleSend.bind(this);
        this.state = {
            messages: [],
            socket: window.io('https://vamosgs.github.io/chat-io/dist/')
        };
    }

    componentDidMount() {
        var self = this;
        this.state.socket.on("receive-message", function (data) {
            console.log(data);
            self.setState({messages: [...self.state.messages, data]})
        });
    }

    handleSend(e) {
        e.preventDefault();
        let text = this.messageInput.value;
        if (text) {
            this.state.socket.emit("new-message", text);
        }
    }

    render() {
        console.log(this.state);
        return (
            <div><h1 className={'heading'}>Welcome to chat</h1>
                <div className={'wrap'}>

                    <div className='SMS'>
                        <ul>
                            {this.state.messages.map((message, i) => <li key={i}>
                                <p>{message}</p>
                                <div className={'info'}><h2>username</h2>
                                    <span>{(new Date()).getHours().toString()}:{(new Date()).getMinutes().toString()}</span>
                                </div>
                            </li>)}
                        </ul>
                    </div>
                    <div className='Adding'>
                        <form onSubmit={this.handleSend}>

                            <input type="text" ref={(input) => {
                                this.messageInput = input;
                            }}/>
                            <button onClick={this.handleSend}>Send</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;