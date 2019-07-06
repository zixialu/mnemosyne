import React from 'react';
import '../styles/button.scss';

class Button extends React.Component {
  render() {
    return (
      <button className="btn" onClick={this.props.onClick}>
        {this.props.children}
      </button>
    );
  }
}

export default Button;
