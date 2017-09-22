import React, {Component} from 'react';
import GoSettings from 'react-icons/lib/go/settings';

class Overlay extends Component {
    render () {
        return  (
            <div className={'Overlay'}>
                <div  onClick={this.props.handleTheme} className={'up'}>
                    <GoSettings
                    />
                </div>
            </div>
        );
    }
}

export default Overlay;