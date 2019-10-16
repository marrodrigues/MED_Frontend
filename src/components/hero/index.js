import React from 'react'
import styled from 'styled-components'

const Main = styled.main`
    display: flex;
    justify-content: center;
    align-items: flex-end;
    height: 90vh;
    background: url('/image/hero-bg.jpeg') center no-repeat, linear-gradient(135deg, #ffffff 25%, #ffe8c4 25%, #ffe8c4 50%, #ffffff 50%, #ffffff 75%, #ffe8c4 75%, #ffe8c4 100%);
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
    // z-index: 2;
`

const Hero = () => (
    <Main>
        <Button>Confira nossos sabores</Button>
    </Main>
)

export default Hero