import React from 'react'
import styled from 'styled-components'

const Title = styled.h1`
color: whitesmoke;
`
const Container = styled.div`
margin-top: 4em;
display: flex;
justify-content: center;
`

function PageTitle(props) {

    return (
        <Container><Title>{props.title}</Title></Container>
    )
}
 
export default PageTitle