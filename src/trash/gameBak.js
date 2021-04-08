import React, { useContext } from "react";
import { WordProvider, WordContext } from "../wordsProvider"
import Home from "../home.js"

function GameName(props){
    return(
    <h1>{props.gameTitle}</h1>
    )
}

function Game() {
    const { tiles, message, targetPhrase, mistakes, gameLength, counter, gameName } = useContext(WordContext);
    const [tilesVal, setTilesVal] = tiles;
    const [messageVal, setMessageVal] = message;
    const [targetPhraseVal, setTargetPhraseVal] = targetPhrase;
    const [mistakesVal, setMistakesVal] = mistakes;
    const [counterVal, setCounterVal] = counter;
    //const [gameName] = gameName;
    const [newGameName] = gameName;
    console.log();
    let myColor = (messageVal == 'Try Again') ? 'red' : 'inherit';
    let myStyle = {
        color: myColor
    }
    return (

        <div id="gamePage">
            <h4><b>{newGameName}</b>: Select the tile that completes the collocation!</h4>
           <div className="gameInner" id="gameArea">
           <div className="targetPhrase" style={myStyle}>{targetPhraseVal}</div>
            <div className="tiles">{tilesVal}</div>
            <div className="message">Question {counterVal} of {gameLength}<br/> Mistakes: {mistakesVal}</div>
           </div>
           <div id="EndGameArea">
               Game over. You made {mistakesVal} mistakes.
           </div>
            
        </div>

    );
}

export default Game;