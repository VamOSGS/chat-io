import React, {Component} from 'react';
import Preloader from './Preloader.jsx';
import Overlay from './Overlay.jsx';
import NewUser from './NewUser.jsx';
import MdArrowForward from 'react-icons/lib/md/arrow-forward';

import SendMessage from './SendMessage.jsx';
import EmojiTable from './EmojiTable.jsx';
import MessageBoard from './MessageBoard.jsx';
import OnlineUsers from './OnlineUsers.jsx';

class App extends Component {
    constructor(props) {
        super(props);
        this.handleSend = this.handleSend.bind(this);
        this.register = this.register.bind(this);
        this.handleEmoji = this.handleEmoji.bind(this);
        this.setEmoji = this.setEmoji.bind(this);
        this.handleTheme = this.handleTheme.bind(this);

        this.state = {
            load: false,
            reigistred: false,
            messages: [],
            users: [],
            emojiOpen: false,
            emojis: [['😀', '😃', '😂'], ['😍', '😘', '😏'], ['😐', '😑', '😯'], [' 👍', '👎', '👆']],
            socket: window.io()
        };
    }

    componentDidMount() {
        this.state.socket.on("receive-message", messages => {
            let today = new Date(),
                date = today.getHours() + '։' + today.getMinutes();
            this.setState({
                messages: [...this.state.messages, {
                    time: date,
                    message: messages.message,
                    user: messages.users.name
                }]
            })
            setTimeout(() => {
                this.MessageBoard.board.scrollTop = this.MessageBoard.board.scrollHeight;
            }, 100)
        })
        this.state.socket.on("receive-user", usersObj => {
            this.setState({
                users: usersObj
            })
        });
        setTimeout(() => {
            this.setState({load: true})
        }, 1200)
    }

    handleEmoji() {
        document.querySelector('table').classList.toggle('open')
    }

    setEmoji(e) {
        e.preventDefault();
        this.Send.messageInput.value += e.target.value;
    }

    handleTheme() {
        document.body.classList.toggle('night');
    }

    register(e) {
        e.preventDefault();
        let user = this.NewUser.registerInput.value;
        if (user) {
            this.state.socket.emit("new-user", user);
            this.setState({
                reigistred: true
            });
        }
    }

    handleSend(e) {
        e.preventDefault();
        let text = this.Send.messageInput;
        if (text.value) {
            this.state.socket.emit("new-message", text.value);
        }
        text.value = null;
        setTimeout(() => {
            this.MessageBoard.board.scrollTop = this.MessageBoard.board.scrollHeight;
        }, 100)
    }


    render() {
        return (
            <div>
                {this.state.load ?

                    <div
                        ref={'wrap'}
                        className={this.state.reigistred ? 'wrap active' : 'wrap'}
                    >

                    <h1 className={this.state.reigistred ?
                        'heading max-width' :
                        'heading'}>
                        {this.state.reigistred ? '' : 'Welcome to '}
                        chat-IO
                    </h1>

                    {this.state.reigistred ? <div className={'registred'}>
                        <Overlay handleTheme={this.handleTheme}/>
                        <div className={'flex'}>

                            <OnlineUsers users={this.state.users}/>

                            <div className='SMS'>

                                <MessageBoard
                                    ref={MessageBoard => this.MessageBoard = MessageBoard}
                                    messages={this.state.messages}
                                />

                                <EmojiTable
                                    emojis={this.state.emojis}
                                    setEmoji={this.setEmoji}
                                />

                                <SendMessage
                                    ref={Send => this.Send = Send}
                                    Send={this.handleSend}
                                    AddEmoji={this.handleEmoji}
                                />

                            </div>

                        </div>
                    </div> :
                        <NewUser ref={NewUser => this.NewUser = NewUser } register={this.register}/>
                    }
                </div> : <Preloader/> }
            </div>
        );
    }
}

export default App;