import React, { useState, useContext, useEffect } from 'react'
import Button from '../components/button'
import { useHistory } from 'react-router-dom'
import { WordDispatchContext } from "../context/wordsProvider"
import { DisplayDispatchContext } from "../context/wordsProvider"
import HomePageBlock from '../components/homePageBlock.js'
import Persist from '../components/persist.js'

function Home() {
    const setUrl = useContext(WordDispatchContext)
    const [gameName, setGameName] = useState('')
    const urlBase = 'https://tomsclassroom.com/student/wp-json/tcplugin/v1/gameNameAboutDownload/'
    const history = useHistory()
    const [gmsList, setGmsList] = useState('');
    const [isLoading, setIsLoading] = useState('Loading...');
    let newGameName = ''

    const {setGameStyle, setRefresh} = useContext(DisplayDispatchContext)

    useEffect(()=>{
        setGameStyle({display:'none'})
        setRefresh((prev)=>!prev)
    },[])

    if (document.getElementById('endGameArea')) {
        document.getElementById('endGameArea').style.display = 'none';
        document.getElementById('gameArea').style.display = 'none';
        document.getElementById('gameTitle').style.visibility = 'hidden';
        document.getElementById('isLoading').style.display = 'none';
    }

    function xClick() {
        document.getElementById('gamesLists').style.display = 'none';
        document.getElementById('collocationInfoArea').style.opacity = '1';

    }

    function handleChoice(e) {
        let gameToTarget = e.target.value
        setGameName(gameToTarget.toUpperCase());
        document.getElementById('gamesLists').style.display = 'flex';
        fetch(urlBase + gameToTarget)
            .then((response) => {
                return response.json()
            })
            .then((result) => {
                let settGmsList = result.map(gm => (
                    <div key={gm.tc_game_index} id="gamesList">
                        { (function removeHyphens(x) {
                            if (x.indexOf('-') > 0) {
                                newGameName = x.replace('-', ' ')
                                return removeHyphens(newGameName)
                            }
                            else {
                                newGameName = x;
                            }
                        })(gm.tc_game_name)}
                        <Button value={gm.tc_game_name} name={newGameName} handleClick={handleClick} class="gamesListBtn"></Button>
                    </div>
                ))
                setGmsList(settGmsList)
                setIsLoading('')
                document.getElementById('collocationInfoArea').style.opacity = '0.0';
            }
            )
    }

    function handleClick(e) {
        let gameToTarget = e.target.value
        setUrl(gameToTarget)
        document.getElementById('endGameArea').style.display = 'none';
        document.getElementById('gameArea').style.display = 'inline';
        document.getElementById('gameTitle').style.visibility = 'visible';
        document.getElementById('isLoading').style.display = 'flex';
        document.getElementById('instruction').style.display = 'inline';
        history.push('/game')
    }

    {/* <p></p>
                        <p>&rarr; 100s of collocations</p>
                        <p>&rarr; Imporove exam results</p>
                        <p>&rarr; Sound like a native</p> */}

    return (
        <div>
            <div className='mainPage'>
                <div className="headingTitle">
                    <h1>Collocation Tester</h1>
                    <h2>for Cambridge exam and IELTS students</h2>
                </div>
                <div className='heading'></div>
                <div className="flex-container-home">

                    <div id="homeTextArea">
                        <h2 className="subHeading">Choose an exam to get started</h2>

                        <div className="homeBtns">
                            <Button class="homeBtn" handleClick={handleChoice} value="FCE" name="FCE" />
                            <Button class="homeBtn" handleClick={handleChoice} value="CAE" name="CAE" />
                            <Button class="homeBtn" handleClick={handleChoice} value="CPE" name="CPE" />
                            <Button class="homeBtn" handleClick={handleChoice} value="IELTS" name="IELTS" />
                            <Button class="homeBtn" handleClick={handleChoice} value="BUSINESS" name="BUSINESS" />
                        </div>
                    </div>
                    <div id="gamesLists">
                        <div className="titleX"><span id="x" onClick={xClick}>X</span><h4>{gameName}</h4></div>
                        <div className="gamesListInner">
                        {isLoading}
                        {gmsList}
                        </div>
                    </div>
                </div>
            </div>
            <HomePageBlock />
            <Persist />
        </div>
    )
}
export default Home