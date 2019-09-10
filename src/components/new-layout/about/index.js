import React from 'react'
import styled from 'styled-components'

const AboutContainer = styled.section`
    margin-top: 5vh;
    min-height: 50vh;
    background-image: linear-gradient(135deg, #ffffff 25%, #ffe8c4 25%, #ffe8c4 50%, #ffffff 50%, #ffffff 75%, #ffe8c4 75%, #ffe8c4 100%);
    background-size: 28.28px 28.28px;
    display: flex;
    flex-direction: column;
`
const PictureAndCTAContainer = styled.div`
    min-height: fit-content;
    height: 50vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
`

const Picture = styled.img`
    object-fit: cover;
    height: 50vh;
    width: 100%;
`
const CTA = styled.button`
    background: #425A15;
    border-radius: 50px;
    width: 400px;
    height: 80px;
    padding: 1vh 1vw;
    // margin-bottom: -100px;
    font: Bold 22px Helvetica;
    color: white;
    position: absolute;
    bottom: 10px;
    border: none;
    z-index: 2;
`

const TextContainer = styled.div`
    display: flex;
    padding: 5vh 20vw;
    background-color: #FFFFFF;
    >:first-child {
        margin-right: 2vw;
    }
`

const Text = styled.p`
    font: 18px Helvetica;
    color: #3F3F3F;
`

const firstColumnText = 'O sonho que esta se realizando. A MED Pizzaria é uma empresa fundada por dois sócios no ano de 2018, tem como foco principal atender da melhor forma nossos clientes com nossas deliciosas pizzas dos mais variados sabores.<br /><br />Com ingredientes selecionados e de primeira qualidade nossos produtos traduzem a satisfação que é fazer parte desse bairro.<br /><br />Temos como visão de futuro, ser um local de referência de qualidade e de orgulho para nossos clientes, atendendo-os da melhor forma possível, pois sua alegria é nossa satisfação!'

const AboutComponent = () => (
    <AboutContainer id='about'>
        <PictureAndCTAContainer>
            <Picture src={'./image/about-bg.jpeg'}/>
            <CTA>Conheça nossa história</CTA>
        </PictureAndCTAContainer>
        <TextContainer>
            <Text dangerouslySetInnerHTML={{__html: firstColumnText}} />
            <Text dangerouslySetInnerHTML={{__html: firstColumnText}} />
        </TextContainer>
    </AboutContainer>
)

export default AboutComponent