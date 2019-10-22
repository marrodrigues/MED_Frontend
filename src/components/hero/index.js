import React from 'react'
import styled from 'styled-components'

const Main = styled.main`
    display: flex;
    justify-content: center;
    align-items: flex-end;
    height: 90vh;
    background: url('/image/hero-bg.jpeg') center/cover no-repeat;
`
const Button = styled.button`
    background: #425A15;
    border-radius: 50px;
    width: 400px;
    height: 80px;
    padding: 1vh 1vw;
    margin-bottom: -50px;
    font: Bold 22px Raspoutine;
    color: white;
    border: none;
`

const Hero = () => (
    <Main>
        <Button>Confira nossos sabores</Button>
    </Main>
)

export default Hero