import React, { createContext, useState, useEffect, useContext } from "react";
import { UserProvider, UserContext, UserDispatchContext } from "./userProvider";

const WordContext = createContext(undefined);
const WordDispatchContext = createContext(undefined);

function WordProvider({ children }) {
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

    useEffect(() => {
        if (url.length > 2) {
            fetch('https://tomsclassroom.com/student/wp-json/tcsplugin/v2/dataDownload/' + url)
                .then((response) => {
                    return response.json()
                })
                .then((data) => {
                    let x = JSON.parse(data[0]['tc_game_data'])
                    setWordSet(x)
                    let y = Object.keys(x).length
                    setGameLength(y)
                })
        }
    }, [url])

    let tilesArray = []

    useEffect(() => {
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
        let sTile = e.target.innerHTML
        setSelectedTile(sTile)
    }

    useEffect(() => {
        if (wordSet[targetPhrase] == selectedTile) {
            let tempWordSet = { ...wordSet }
            delete tempWordSet[targetPhrase]
            setWordSet(() => tempWordSet)
            setSelectedTile(null)
            setMessage('Correct')
            // game ends
            if (Object.keys(wordSet).length === 0) {
                setMessage('Game Over')
                let GameId = url.slice(68);
                let numberCorrect = gameLength - mistakes;
                let newJSONUserDataString = '';
                let JSONUserData = '';
                let create;
                // if user is signed in
                if (userDetails.isLoggedIn) {
                    if (userDetails.userData !== "") {
                        JSONUserData = JSON.parse(userDetails.userData);
                        // if this is not first attempt, find the name of course, update it and resend it
                        if (JSONUserData['courses'].findIndex(x => x.name == GameId) >= 0) {
                            console.log('situation 1')
                            let index = JSONUserData['courses'].findIndex(x => x.name == GameId);
                            JSONUserData['courses'][index]['marks'] = numberCorrect;
                        }
                        else if (JSONUserData['courses'].length > 0) {
                            console.log('situation 2');
                            // add course to existing string
                            let newIndex = JSONUserData.courses.length;
                            JSONUserData.courses[newIndex] = {};
                            JSONUserData.courses[newIndex].name = GameId;
                            JSONUserData.courses[newIndex].marks = numberCorrect;
                        }
                        create = "updateData";
                    }
                    else {
                        console.log('situation 3');
                        create = "createData";
                        let baseUserData = {};
                        // creat new string 
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
                    console.log(create);
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
                        // handle end of game logged in
                }
                else {
                    console.log('user not logged in so finish') // handle end of game not logged in
                    document.getElementById('gameArea').style.display = 'none';
                    document.getElementById('EndGameArea').style.display = 'inline';
                }
            }
        }
        else if (selectedTile.length > 1) {
            setMessage('Try Again')
            setMistakes(mistakes + 1)
        }
    }, [selectedTile])

    useEffect(() => {
        if (message === 'Correct') {
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

    return (
        <WordContext.Provider value={{
            tiles: [tiles, setTiles], wordSet: [wordSet, setWordSet],
            targetPhrase: [targetPhrase, setTargetPhrase], selectedTile: [selectedTile, setSelectedTile], mistakes: [mistakes, setMistakes],
            gameLength: [gameLength, setGameLength], message: [message, setMessage], counter: [counter, setCounter], gameName: [url]
        }}>
            <WordDispatchContext.Provider value={setUrl}>
                {children}
            </WordDispatchContext.Provider>
        </WordContext.Provider>
    );
}

export { WordProvider, WordContext, WordDispatchContext };