import React from 'react'
import styled from 'styled-components'

const Container = styled.main`
    min-height: 100vh;
    min-width: 100vw;
    height: fit-content;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    z-index: -1;
    background-image: linear-gradient(135deg, #ffffff 25%, #ffe8c4 25%, #ffe8c4 50%, #ffffff 50%, #ffffff 75%, #ffe8c4 75%, #ffe8c4 100%);
    background-size: 28.28px 28.28px;
`
const Background = styled.img`
    // object-fit: contain;
    // height: auto;
    width: 100%;
`

const Button = styled.button`
    background: #425A15;
    border-radius: 50px;
    width: 400px;
    height: 80px;
    padding: 1vh 1vw;
    margin-bottom: -100px;
    font: Bold 22px Helvetica;
    color: white;
    position: absolute;
    bottom: 120px;
    border: none;
    z-index: 2;
`

const HeroComponent = () => (
    <Container>
        <Background src={'/image/hero-bg.jpeg'} />
        <Button>Confira nossos sabores</Button>
    </Container>
)

export default HeroComponent