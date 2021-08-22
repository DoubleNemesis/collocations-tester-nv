import React, {useContext} from 'react';
import { useHistory } from 'react-router-dom'
import { UserContext, UserDispatchContext } from "../context/userProvider";
import { WordDispatchContext } from "../context/wordsProvider"
import Button from '../components/button'

function UserArea(){
    const history = useHistory()
    const setUrl = useContext(WordDispatchContext)
    const userDetails = useContext(UserContext);
    const display = (userDetails.isLoggedIn) ? 'inline' : 'none';
    const userAreaDisplay = {display: display}
    let newGameName = ''

    let userAreaData;
    function handleClick(e) {
        let gameToTarget = e.target.value
        setUrl(gameToTarget)
        document.getElementById('endGameArea').style.display = 'none';
        document.getElementById('gameArea').style.display = 'inline';
        document.getElementById('gameTitle').style.visibility ='visible';
        history.push('/game')
    }
                // <li key={index}>{item.name.toUpperCase()} ({item.marks} out of 10) <Button name="Retest" value={item.name} handleClick={handleClick} class="userAreaBtn"/></li>
 
    if(userDetails.isLoggedIn){ 
        userAreaData = userDetails.userData ? "Here are your saved results." : "Your saved results will appear here!";
        if (userDetails.userData !== 'undefined' && userDetails.userData !== '' && userDetails.userData) {
            // console.log('Data found');
            // console.log(userDetails.userData === true);
            let courseJSON = JSON.parse(userDetails.userData);
            userAreaData = courseJSON.courses.map((item, index) =>(
                <div>
                {(function removeHyphens(x){
                    if (x.indexOf('-')>0){
                        newGameName = x.replace('-', ' ')
                        return removeHyphens(newGameName)
                    }
                    else {
                        newGameName = x;
                     }
                })(item.name)}
<Button key={index} name={`${newGameName.toUpperCase()}: (${item.marks} out of 10)`} value={item.name} handleClick={handleClick} class={item.marks>9 ? 'highScore' : 'lowScore' }/>
               </div>
               ))
        }
        else{
            console.log('no userdata yet');
        }
    }
    return(
        <div style={userAreaDisplay} id="userArea">
            <h5>{userDetails.username}'s saved tests. Click to retry.</h5>
            <div id="testsAndScores">
            <ul>{userAreaData}</ul>
            </div>
        </div>
    )
}

export default UserArea