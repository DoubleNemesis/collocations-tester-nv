import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom'
import { UserContext, UserDispatchContext } from "../context/userProvider";
import { WordDispatchContext } from "../context/wordsProvider"
import Button from './button'
import DashboardBlock from './DashboardBlock'

function UserArea() {
    const history = useHistory()
    const setUrl = useContext(WordDispatchContext)
    const userDetails = useContext(UserContext);
    const display = (userDetails.isLoggedIn) ? 'inline' : 'inline';
    const userAreaDisplay = { display: display }
    let newGameName = ''

    let userAreaData;
    function handleClick(e) {
        let gameToTarget = e.target.value
        setUrl(gameToTarget)
        document.getElementById('endGameArea').style.display = 'none';
        document.getElementById('gameArea').style.display = 'inline';
        document.getElementById('gameTitle').style.visibility = 'visible';
        history.push('/game')
    }

    if (userDetails.isLoggedIn) {
        userAreaData = userDetails.userData ? "Here are your tests." : "Your saved tests will appear here!";
        if (userDetails.userData !== 'undefined' && userDetails.userData !== '' && userDetails.userData) {
            let courseJSON = JSON.parse(userDetails.userData);
            userAreaData = courseJSON.courses.map((item, index) => (
                <div>
                    {(function removeHyphens(x) {
                        if (x.indexOf('-') > 0) {
                            newGameName = x.replace('-', ' ')
                            return removeHyphens(newGameName)
                        }
                        else {
                            newGameName = x;
                        }
                    })(item.name)}
                    {/* <p>{newGameName}: {item.marks} out of 10
                    <Button key={index} name="Try again" value={item.name} handleClick={handleClick} class={item.marks > 9 ? 'highScore' : 'lowScore'} />
                    </p> */}
                    <DashboardBlock key={index} gameName={newGameName} marks={item.marks} name={item.name} value={item.name} handleClick={handleClick} />
                </div>
            ))
        }
        else {
            console.log('no userdata yet');
        }
    }
    return (
        <div style={userAreaDisplay} id="userArea">
            <h4>saved tests</h4>
            <div id="testsAndScores">
                    {userAreaData}
            </div>
        </div>
    )
}

export default UserArea