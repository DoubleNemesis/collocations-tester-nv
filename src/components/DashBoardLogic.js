import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom'
import { UserContext } from "../context/userProvider";
//import { UserContext, UserDispatchContext } from "../context/userProvider";
import { WordDispatchContext } from "../context/wordsProvider"
import DashboardBlock from './DashboardBlock'

function DashBoardLogic() {
    const history = useHistory()
    const setUrl = useContext(WordDispatchContext)
    const userDetails = useContext(UserContext);
    const display = (userDetails.isLoggedIn) ? 'inline' : 'inline';
    const userAreaDisplay = { display: display }
    let newGameName = ''
    let userAreaData;
    let userAreaMessage;

    function handleClick(e) {
        let gameToTarget = e.target.value
        setUrl(gameToTarget)
        document.getElementById('endGameArea').style.display = 'none';
        document.getElementById('gameArea').style.display = 'inline';
        document.getElementById('gameTitle').style.visibility = 'visible';
        history.push('/game')
    }

    if (userDetails.isLoggedIn) {
        userAreaMessage = userDetails.userData ? "Here are your tests." : "Your saved tests will appear here!";
        if (userDetails.userData !== 'undefined' && userDetails.userData !== '' && userDetails.userData) {
            let previousTestsJSON = JSON.parse(userDetails.userData);
            userAreaData = previousTestsJSON.courses.map((item, index) => (
                <div>
                    {(function removeHyphens(game) {
                        if (game.indexOf('-') > 0) {
                            newGameName = game.replace('-', ' ')
                            return removeHyphens(newGameName)
                        }
                        else {
                            newGameName = game;
                        }
                    })(item.name)}
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
            <h4>{userAreaMessage}</h4>
            <div id="testsAndScores">
                    {userAreaData}
            </div>
        </div>
    )
}

export default DashBoardLogic