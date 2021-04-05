import React from 'react'

function Button(props) {

    return (
        <button className={props.class} value={props.value} onClick={props.handleClick}>{props.name}</button>
    )
}

export default Button