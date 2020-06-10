import React from 'react';
import classess from './Button.css'

const button = (props) => (
<button
    disabled={props.disabled}
    className={[classess.Button, classess[props.btnType]].join(' ')}
    onClick={props.clicked}> {props.children}</button>

);

export default button;