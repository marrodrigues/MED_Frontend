import  React from 'react'
import styled from 'styled-components'

import { LoginRegister } from '../'

const Footer = styled.footer`
    display: flex;
    padding: 5vh 5vw;
    background-color: #425A15;
    justify-content: space-around;
`

const ContactInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`
const Map = styled.img`
    object-fit: contain;
    width: 15vw;
    border-radius: 5px;
    :hover {
        cursor: pointer;
    }
`
const Contact = styled.p`
    margin-top: 2vh;
    padding: 1vh 1vw;
    border-left: solid 1px yellow;
    color: #FFFFFF;
    font-family: HelveticaNeue;
`
const contact = 'Rua Calmon - N: 22<br />Curicica - Rio de Janeiro / RJ<br /><br />Tel.: (21) 3456-8976 / (21) 98763-0912'

const mapLink = 'https://www.google.com/maps/place/R.+Calmom,+22+-+Curicica,+Rio+de+Janeiro+-+RJ,+22710-350/@-22.9471758,-43.3870023,17z/data=!3m1!4b1!4m5!3m4!1s0x9bd915cad6a273:0x47c59a896d079327!8m2!3d-22.9471758!4d-43.3848136'

class FooterComponent extends React.Component {
    openMapTab = () => {
        window.open(mapLink, '_blank')
    }

    render() {
        return (
            <Footer id='footer'>
                <LoginRegister
                />
                <ContactInfo>
                    <Map src={'/image/map.png'} onClick={this.openMapTab}/>
                    <Contact dangerouslySetInnerHTML={{__html: contact}} />
                </ContactInfo>
            </Footer>
        )
    }
} 

export default FooterComponent