import React from "react";
import Button from "../components/button.js"

function Game(props) {


    return (
        <>
            <div id="isLoading">{props.loading}</div>
            <div id="gamePage" style={props.style}>
                <div id="gameTitle"><b>{props.gameName}</b><hr /><div id="instruction">Select the tile that <u>best</u> completes the collocation!</div></div>
                <div id="gameArea">
                    <div className="targetPhrase" id={props.id}>{props.targetPhrase}</div>
                    <div className="tiles">{props.tiles}</div>
                    <div className="message">Question {props.counter} of {props.gameLength}<br /> Mistakes: {props.mistakes}</div>
                   
                    {props.isGameOver ?
                    <>
                        <div id="endArea">
                        <div id="endGameMessage">You made {props.mistakes} mistakes. </div>
                        <Button class="endGameBtns" value="again" name="Play Again" handleClick={props.endGame} />
                        <Button class="endGameBtns" value="home" name="Home" handleClick={props.endGame} />

                        </div>
                    </>
                    : null}
                </div>
                <div id="endGameArea">
                    <div id="endGameMessage">You made {props.mistakes} mistakes.</div>
                    <Button class="endGameBtns" value="again" name="Play Again" handleClick={props.endGame} />
                    <Button class="endGameBtns" value="home" name="Home" handleClick={props.endGame} />
                </div>

            </div>
        </>

    );
}

export default Game;
