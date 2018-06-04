import React, { Component } from 'react';

class EmojiTable extends Component {
  render() {
    return (
      <table
        ref={table => {
          this.emojiTable = table;
        }}
      >
        <tbody>
          {this.props.emojis.map((arr, i) => (
            <tr key={i}>
              {arr.map((emoj, i) => (
                <td key={i}>
                  <input
                    type="button"
                    className={'noDef'}
                    value={emoj}
                    onClick={e => this.props.setEmoji(e)}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default EmojiTable;
