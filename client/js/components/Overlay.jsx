import React, { Component } from 'react';
import MdCompare from 'react-icons/lib/md/compare';

class Overlay extends Component {
  render() {
    return (
      <div className={'Overlay'}>
        <div onClick={this.props.handleTheme} className={'up'}>
          <MdCompare />
        </div>
      </div>
    );
  }
}

export default Overlay;
