import React, {Component} from 'react';
import MdArrowForward from 'react-icons/lib/md/arrow-forward';
import FaSmileO from 'react-icons/lib/fa/smile-o';

class SendMessage extends Component {
    render () {
        return  (
            <div className='Adding'>
                <form onSubmit={ this.props.Send }>
                    <input
                           type="text"
                           ref={input => this.messageInput = input }
                           placeholder={'Message...'}
                    />
                    <div>
                        <FaSmileO onClick={this.props.AddEmoji}/>
                    </div>
                    <button><MdArrowForward/></button>
                </form>
            </div>
        );
    }
}

export default SendMessage;