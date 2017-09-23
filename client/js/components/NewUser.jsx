import React, {Component} from 'react';
import MdArrowForward from 'react-icons/lib/md/arrow-forward';

class NewUser extends Component {
    render () {
        return  (
            <div className={'new-user'}>
                <form onSubmit={ e => this.props.register(e, this.registerInput.value )}>
                    <input
                           type="text"
                           ref={input => this.registerInput = input}
                           placeholder={'Pick a nickname'}
                    />
                    <button><MdArrowForward/></button>
                </form>
            </div>
        );
    }
}

export default NewUser;