import React, { useContext, useEffect, useState } from "react"
import styled from 'styled-components'
import UserAreaAc from '../components/UserAreaAc.js'
import PageTitle from '../components/PageTitle'
import { DisplayDispatchContext } from "../context/wordsProvider"

const TestBlock = styled.div`
width: 69%;
margin: 1.5em auto 0  auto;
background-color: whitesmoke;
color: #333 !important;
padding: 2em;
border-radius: .2em;

h4{
    color: #333;
    font-size: 2rem;
    margin-left: 1em;
}

li{
    color: #333;
    font-weight: 600;
    list-style-type: none;
    padding-top: .5em;
}
ul li::marker {
    list-style-type: none;
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
`

function Dashboard() {

    const {setGameStyle, setRefresh} = useContext(DisplayDispatchContext)

    useEffect(()=>{
        setGameStyle({display:'none'})
        setRefresh((prev)=>!prev)
    },[])

    return (
        <>
            <PageTitle title="dashboard" />
            <TestBlock>
                    <UserAreaAc />
            </TestBlock>
        </>
    )
}

export default Dashboard