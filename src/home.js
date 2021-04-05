import React, { useState, useContext } from 'react'
import Button from './components/button'
import { useHistory } from 'react-router-dom'
import { WordDispatchContext } from "./wordsProvider"
import HomePageBlock from './homePageBlock.js'
import UserArea from './userArea.js'
import Persist from './persist.js'

function Home() {
    const setUrl = useContext(WordDispatchContext)
    const [gameName, setGameName] = useState('')
    const urlBase = 'https://tomsclassroom.com/student/wp-json/tcplugin/v1/gameNameAboutDownload/'
    const history = useHistory()
    const [gmsList, setGmsList] = useState('');
    const [isLoading, setIsLoading] = useState('Loading...');
    let newGameName = ''

    if(document.getElementById('endGameArea')){
        document.getElementById('endGameArea').style.display = 'none';
        document.getElementById('gameArea').style.display = 'none';
        document.getElementById('gameTitle').style.visibility ='hidden';
        document.getElementById('isLoading').style.display ='none';
    }

    function xClick(){
        document.getElementById('gamesLists').style.display = 'none';
        document.getElementById('homeTextArea').style.opacity = '1';
        
    }

    function handleChoice(e) {
         let gameToTarget = e.target.value
         setGameName(gameToTarget.toUpperCase());
         document.getElementById('gamesLists').style.display = 'inline-block';
         fetch(urlBase + gameToTarget)
            .then((response) => {
                return response.json()
            }) 
            .then((result) => {
                let settGmsList = result.map(gm => (
                    <div key={gm.tc_game_index} id="gamesList">
               { (function removeHyphens(x){
                        if (x.indexOf('-')>0){
                            newGameName = x.replace('-', ' ')
                            return removeHyphens(newGameName)
                        }
                        else {
                            newGameName = x;
                         }
                    })(gm.tc_game_name)}
                        <Button value={gm.tc_game_name} name={newGameName.toUpperCase()} handleClick={handleClick} class="gamesListBtn"></Button>
                    </div>
                ))
                setGmsList(settGmsList)
                setIsLoading('')
                document.getElementById('homeTextArea').style.opacity = '0.0';
            }
            )
    }

    function handleClick(e) {
        let gameToTarget = e.target.value
        setUrl(gameToTarget)
        document.getElementById('endGameArea').style.display = 'none';
        document.getElementById('gameArea').style.display = 'inline';
        document.getElementById('gameTitle').style.visibility ='visible';
        document.getElementById('isLoading').style.display ='inline';
        document.getElementById('instruction').style.display = 'inline';
        history.push('/game') 
    }

    return (
        <div>
        <div className='mainPage'>
        <div className="headingTitle">
                <h1>Collocation Tester</h1>
                <h2>for Cambridge exam and IELTS students</h2>
                </div>
            <div className='heading'>

                </div>
                <div className="flex-container-home">
                <div class="homeBtns">
                    <Button class="homeBtn" handleClick={handleChoice} value="FCE" name="FCE" />
                    <Button class="homeBtn" handleClick={handleChoice} value="CAE" name="CAE" />
                    <Button class="homeBtn" handleClick={handleChoice} value="CPE" name="CPE" />
                    <Button class="homeBtn" handleClick={handleChoice} value="IELTS" name="IELTS" />
                    <Button class="homeBtn" handleClick={handleChoice} value="BUSINESS" name="BUSINESS" />
                </div>
                <div id="homeTextArea">
                    <h1 className="subHeading">Choose your Exam</h1>
                    <p></p>
                    <p>&rarr; 100s of collocations</p>
                    <p>&rarr; Imporove exam results</p>
                    <p>&rarr; Sound like a native</p>
                </div>
                <div id="gamesLists">
                <h4>{gameName}<span id="x" onClick={xClick}>X</span></h4>
                {isLoading}
                {gmsList}

                </div>
                </div>
                


        </div>
        <UserArea/>
        <HomePageBlock/>  
        <Persist/>
        </div>
    )
}
export default Home