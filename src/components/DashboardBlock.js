import React from 'react'
import Button from './button'


function DashboardBlock(props) {

    if (document.getElementById('endGameArea')) {
        document.getElementById('endGameArea').style.display = 'none';
        document.getElementById('gameArea').style.display = 'none';
        document.getElementById('gameTitle').style.visibility = 'hidden';
        document.getElementById('isLoading').style.display = 'none';
    }

    return (
        <>
        <li key={props.keyt}>
            <Button name="Play Again" value={props.value} handleClick={props.handleClick} /> {props.gameName}: {props.marks} / 10. 
            <span className={props.marks === 10 ? 'green' : props.marks <7 ? 'red' : 'amber'}> 
            {props.marks === 10 ? ' Perfect!' : props.marks <7 ? ' Not good enough' : ' Pretty good'}</span>
            </li>
        </>
    )
}
 
export default DashboardBlock