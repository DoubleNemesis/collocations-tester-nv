import React, { useContext, useEffect } from "react"
import styled from 'styled-components'
import DashBoardLogic from '../components/DashBoardLogic.js'
import PageTitle from '../components/PageTitle'
import { DisplayDispatchContext } from "../context/wordsProvider"

const TestBlock = styled.div`
width: 69%;
margin: 1.5em auto 0  auto;
background-color: whitesmoke;
color: #333 !important;
padding: 2em;
border-radius: .2em;
border: 1px solid red;

@media(max-width: 900px){
    width: 90%;
    padding: .5em;

    ul{
        padding-inline-start: .2em;
        font-size: .9rem;
    }
}

h4{
    color: #333;
    font-size: 2rem;
    margin-left: 1em;
}

  .red{
    color: red;
}

.amber{
    color: orange;
}

.green{
    color: green;
}

#testsAndScores{
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    justify-content: center;
}

.scoreContainer{
    border: 1px solid #999;
    color: #333;
    padding: .4em;
    margin: .5em;
    font-weight: 600;
    width: 300px;
}
.scoreButton{
    border-radius: .2em;
    border: 1px solid #666;
    font-weight: 700;

    :hover{
        background-color: #333;
        color: whitesmoke;
    }
}

`

function Dashboard() {

    const {setGameStyle, setRefresh} = useContext(DisplayDispatchContext)

    useEffect(()=>{
        setGameStyle({display:'none'})
        setRefresh((prev)=>!prev)
    },[setGameStyle, setRefresh]) //check this

    return (
        <>
            <PageTitle title="dashboard" />
            <TestBlock>
                    <DashBoardLogic />
            </TestBlock>
        </>
    )
}

export default Dashboard