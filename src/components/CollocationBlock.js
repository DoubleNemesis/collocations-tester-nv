import React from 'react'

function CollocationBlock(props){

let color1 = {
    color: 'Navy'
}
let color2 = {
    color: 'Green'
}
return (
    <div className="collocations">
    <h3 className="blockTitle">{props.title}</h3>
    <h5 className="blockText"><span style={color1}>{props.col1a}</span><span style={color2}> {props.col1b}</span></h5>
    <h5 className="blockText"><span style={color1}>{props.col2a}</span><span style={color2}> {props.col2b}</span></h5>
    <h5 className="blockText"><span style={color1}>{props.col3a}</span><span style={color2}> {props.col3b}</span></h5>
    </div>
)
}

export default CollocationBlock