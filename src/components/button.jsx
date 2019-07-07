import React from 'react';
import '../styles/button.scss';

function Button(props) {
  return (
    <button className="btn" onClick={props.onClick}>
      {props.children}
    </button>
  );
}

export default Button;
