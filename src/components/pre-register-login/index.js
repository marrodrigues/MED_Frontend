import React from 'react'
import styled from 'styled-components'
import LoginForm from '../login-form'
import PreRegisterForm from '../pre-register-form'

const Container = styled.div`
    display: flex;
    // background: linear-gradient(to right bottom, #fc0000, #777777);
    background-image:
        linear-gradient(to right bottom, rgba(252, 216, 101, 0.5), rgba(252, 0, 0, 0.5)),
        url(/static/media/pizza_header.2ef83791.jpg);
    background-size: cover;
`

export default class extends React.Component {
    render () {
        return (
            <Container id='forms'>
                <PreRegisterForm />
                <LoginForm />
            </Container>
        )
        
    }
}