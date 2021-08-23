import React, { createContext, useState, useEffect, useContext } from "react";
import { UserContext, UserDispatchContext } from "./userProvider";
import Game from '../pages/game.js'
import { useHistory } from 'react-router-dom'

const WordDispatchContext = createContext(undefined);
const DisplayDispatchContext = createContext(undefined);

function WordProvider({ children }) {
    const history = useHistory()
    const userDetails = useContext(UserContext);
    const setUserDetails = useContext(UserDispatchContext)
    const [url, setUrl] = useState('');
    const [wordSet, setWordSet] = useState([]);
    const [gameLength, setGameLength] = useState();
    const [tiles, setTiles] = useState([]);
    const [targetPhrase, setTargetPhrase] = useState([]);
    const [selectedTile, setSelectedTile] = useState([]);
    const [message, setMessage] = useState([]);
    const [mistakes, setMistakes] = useState(0);
    const [counter, setCounter] = useState(0);
    const [refresh, setRefresh] = useState(false);
    const [gameStyle, setGameStyle] = useState({display: 'none'})
    const [gameName, setGameName] = useState('')
    const [isLoading, setIsLoading] = useState('Loading...');
    const [newGameName, setNewGameName] = useState('')
    const [isGameOver, setIsGameOver] = useState(false)


    useEffect(() => {
        if (url.length > 2) {
            fetch('https://tomsclassroom.com/student/wp-json/tcsplugin/v2/dataDownload/' + url)
                .then((response) => {
                    return response.json()
                })
                .then((data) => {
                    let newWordSet = JSON.parse(data[0]['tc_game_data'])
                    setWordSet(newWordSet)
                    let newGameLength = Object.keys(newWordSet).length
                    setGameLength(newGameLength)
                    setGameStyle({display: 'inline'})
                    setGameName(url)
                    setIsLoading('')
                    setCounter(0)
                    setMistakes(0)
                })
        }
    }, [url, refresh])

    

    useEffect(() => {
        let tilesArray = []
        let counter = 0
        for (let key in wordSet) {
            tilesArray.push(
                <button key={`phrase${counter}`} className="tile" id={`tile${counter}`} onClick={e => handleClick(e)}>
                    {`${wordSet[key]}`}
                </button>)
            counter++
        }
        setTiles(tilesArray)
    }, [wordSet]) 

    function handleClick(e) {
        setMessage('')
        let newSelectedTile = e.target.innerHTML
        setSelectedTile(newSelectedTile)
    }

    useEffect(() => {
        if (wordSet[targetPhrase] == selectedTile) {
            // let tempWordSet = { ...wordSet }
            // console.log(wordSet)
            // console.log(tempWordSet[targetPhrase])
            // delete tempWordSet[targetPhrase]
            // setWordSet(() => tempWordSet)

setWordSet(prev=>{
    delete prev[targetPhrase]
    return(
        {...prev}
    )
})


            setSelectedTile(null)
            setMessage('Correct')

            // game ends
            if (Object.keys(wordSet).length == 0) {
                setMessage('Game Over')
                setIsGameOver(true)
                let GameId = url;
                let numberCorrect = gameLength - mistakes;
                let newJSONUserDataString = '';
                let JSONUserData = '';
                let create;

                // update users' data
                if (userDetails.isLoggedIn) {
                    if (userDetails.userData !== 'undefined' && userDetails.userData !== '' && userDetails.userData) {
                        JSONUserData = JSON.parse(userDetails.userData);

                        // if this is not first attempt, find the name of course, update it and resend it
                        if (JSONUserData['courses'].findIndex(x => x.name == GameId) >= 0) {
                            // console.log('situation 1')
                            let index = JSONUserData['courses'].findIndex(x => x.name == GameId);
                            JSONUserData['courses'][index]['marks'] = numberCorrect;
                        }
                        else if (JSONUserData['courses'].length > 0) { // add course to existing string
                            // console.log('situation 2');
                            let newIndex = JSONUserData.courses.length;
                            JSONUserData.courses[newIndex] = {};
                            JSONUserData.courses[newIndex].name = GameId;
                            JSONUserData.courses[newIndex].marks = numberCorrect;
                        }
                        create = "updateData";
                    }
                    else {
                        // console.log('situation 3');
                        create = "createData";
                        // let baseUserData = {};
                        JSONUserData = {}
                        JSONUserData.userID = userDetails.userId;
                        JSONUserData.courses = [];
                        JSONUserData.courses['0'] = {};
                        JSONUserData.courses['0'].name = GameId;
                        JSONUserData.courses['0'].marks = numberCorrect;
                    }

                    newJSONUserDataString = JSON.stringify(JSONUserData);
                    let urlForUpdate = 'https://tomsclassroom.com/student/ajaxphp-update-game.php';
                    let formData = new FormData()
                    formData.append('userid', userDetails.userId)
                    formData.append('jwt', userDetails.userJWT)
                    formData.append('userData', newJSONUserDataString)
                    formData.append('create', create)
                    localStorage.setItem('userData', newJSONUserDataString)
                    fetch(urlForUpdate, {
                        method: 'POST',
                        body: formData,
                    })
                        .then((response) => {
                            return response.text()
                        })
                        .then((post) => {
                            setUserDetails(prev => ({ ...prev, userData: newJSONUserDataString, }))
                        })
                }
                else {
                    return
                }
            }
        }   
        else if (selectedTile.length > 1) {
            setMessage('Try Again')
            setMistakes(mistakes + 1)
        }
    },[selectedTile, gameLength, setUserDetails, url, userDetails.isLoggedIn, userDetails.userData, userDetails.userId, userDetails.userJWT])

    useEffect(() => {
        if (message == 'Correct') {
            setCounter(prev => prev + 1)
        }

    }, [message])

    useEffect(() => {
        let myPhrases = []
        for (let key in wordSet) {
            myPhrases.push(key)
        }
        let ran = Math.floor(Math.random() * myPhrases.length)
        setTargetPhrase(myPhrases[ran])
    }, [wordSet])

    function endGame(e){
        let buttonClicked = e.target.value;
        setIsGameOver(false)
        if(buttonClicked === 'home'){
            setRefresh((prev)=>!prev)
        setCounter(0)
        setMistakes(0)
        history.push('/')
        //reset values
        }
        else if (buttonClicked === 'again'){
        //reset values
        //set url to gameName
        setRefresh((prev)=>!prev)
        setCounter(0)
        setMistakes(0)
        } 
    }

    useEffect(()=>{
        (function removeHyphens(newGameName){
            if (newGameName.indexOf('-')>0){
                let newGameNameNoHyphens = newGameName.replace('-', ' ')
                setNewGameName(newGameNameNoHyphens)
                return removeHyphens(newGameNameNoHyphens) //memory leak???
            }
            else {
                setNewGameName(newGameName);
             }
        })(gameName) 
    },[gameName])


    return (
        <div>
            <DisplayDispatchContext.Provider value={{setGameStyle, setRefresh}}>
            <WordDispatchContext.Provider value={setUrl}>
                {children}
            </WordDispatchContext.Provider>
            </DisplayDispatchContext.Provider>
            <Game 
            loading={isLoading} 
            gameName={newGameName.toUpperCase()} 
            id={(message === 'Try Again' ? 'red' : 'inherit')}
            isGameOver={isGameOver}
            targetPhrase={targetPhrase}
            tiles={tiles} 
            counter={counter} 
            gameLength={gameLength} 
            mistakes={mistakes} 
            endGame={endGame} 
            style={gameStyle} 
            setGameStyle={setGameStyle}/>
        </div>
    );
}

export { WordProvider, WordDispatchContext, DisplayDispatchContext };