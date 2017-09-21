import React, {Component} from 'react';
import MdArrowForward from 'react-icons/lib/md/arrow-forward';
import FaSmileO from 'react-icons/lib/fa/smile-o';
class App extends Component {
    constructor(props) {
        super(props);
        this.handleSend = this.handleSend.bind(this);
        this.register = this.register.bind(this);
        this.handleEmojiON = this.handleEmojiON.bind(this);
        this.handleEmojiOFF = this.handleEmojiOFF.bind(this);
        this.setEmoji = this.setEmoji.bind(this);

        this.state = {
            reigistred: false,
            messages: [],
            users: [],
            emojiOpen: false,
            emojis: [['😀','😃','😂'],['😍','😘','😏'],['😐','😑','😯']],
            socket: window.io('http://localhost:3000/')
        };
    }

    componentDidMount() {
        this.state.socket.on("receive-message",  messages => {
            let today = new Date(),
                date =  today.getHours() + '։' + today.getMinutes() ;
            console.log(date)
            this.setState({messages: [...this.state.messages, {time: date, message: messages.message, user: messages.users.name }, messages.message]})
        });
        this.state.socket.on("receive-user",  usersObj => {
            console.log(usersObj)
            this.setState({
                users: usersObj
            })
        });
    }
    handleEmojiON() {
        this.emojiTable.classList.add('open')
    }
    handleEmojiOFF() {
        this.emojiTable.classList.remove('open')
    }
    setEmoji(e) {
        e.preventDefault();
        this.messageInput.value += e.target.value;
    }
    register (e) {
        e.preventDefault();
        let user = this.registerInput.value;
        if (user) {
            this.state.socket.emit("new-user", user);
            this.setState({
                reigistred: true
            });
        }
    }

    handleSend(e) {
        e.preventDefault();
        let text = this.messageInput.value;
        if (text) {
            this.state.socket.emit("new-message", text);
        }
        this.messageInput.value = null;
        this.board.scrollTop = this.board.scrollHeight+ 100;
    }


    render() {
        console.log(this.state.messages.pop())
        return (
            <div>
                <div className={this.state.reigistred ?'wrap active' : 'wrap'}>
                    <h1 className={ this.state.reigistred ? 'heading max-width' : 'heading' }>{this.state.reigistred ? '' : 'Welcome to' } chat-IO</h1>
                    {this.state.reigistred ?  <div className={'registred'}>
                        <div className={'flex'}>
                            <div className={'onlineUsers'}>
                                <h1>Online Users</h1>
                                <ul>
                                    {this.state.users.map(( obj, i) => <li key={i}>{ obj.name }</li>)}
                                </ul>
                            </div>
                            <div className='SMS'>
                                <ul ref={(ul) => {
                                    this.board = ul;
                                }} >
                                    {this.state.messages.map((message, i) => <li key={i}>
                                        <p>{message.message}</p>
                                        <div className={'info'}><h2>{ this.state.messages[i].user }</h2>
                                            <span>{message.time}</span>
                                        </div>
                                    </li>)}
                                </ul>
                                <div className='Adding'>
                                    <form onSubmit={this.handleSend}>
                                        <input type="text" ref={(input) => {
                                            this.messageInput = input;
                                        }}
                                         placeholder={'Message...'}
                                        />
                                        <div onMouseEnter={this.handleEmojiON}
                                             onMouseLeave={this.handleEmojiOFF}>
                                            <table ref={(table) => {
                                                this.emojiTable = table;
                                            }}>
                                                <tbody>
                                                {this.state.emojis.map((arr,i ) => <tr key={i}>{arr.map((emoj,i) => <td   key={i}>
                                                    <input type="button" className={'noDef'} value={emoj} onClick={(e) => this.setEmoji(e)}/></td>)}</tr>)}
                                                </tbody>
                                            </table>
                                            <FaSmileO />
                                        </div>
                                        <button> <MdArrowForward /></button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div> :   <div className={'new-user'}>
                        <form onSubmit={this.register}>
                            <input type="text" ref={(input) => {
                                this.registerInput = input;
                            }}
                             placeholder={'Pick a nickname'}
                            />
                            <button> <MdArrowForward /> </button>
                        </form>
                    </div>}


                </div>
            </div>
        );
    }
}

export default App;