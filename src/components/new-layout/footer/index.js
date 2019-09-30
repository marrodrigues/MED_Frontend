import  React from 'react'
import styled from 'styled-components'

import ActionButton from '../button'
import UserProvider from '../../../providers/user'
import LoginRegister from '../login-register'
import { FORM_INPUT_IDS } from '../../../util/constants'

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
`
const contact = 'Rua Calmon - N: 22<br />Curicica - Rio de Janeiro / RJ<br /><br />Tel.: 21- 3456-8976 / 8763-0912'

const mapLink = 'https://www.google.com/maps/place/R.+Calmom,+22+-+Curicica,+Rio+de+Janeiro+-+RJ,+22710-350/@-22.9471758,-43.3870023,17z/data=!3m1!4b1!4m5!3m4!1s0x9bd915cad6a273:0x47c59a896d079327!8m2!3d-22.9471758!4d-43.3848136'

const initialState = {
    [FORM_INPUT_IDS.LOGIN]: '',
    [FORM_INPUT_IDS.SENHA]: '',
    [FORM_INPUT_IDS.CEP]: '',
    [FORM_INPUT_IDS.NUMERO]: ''
}
class FooterComponent extends React.Component {
    state = {
        ...initialState
    }
    handleChange = (event) => {
        const { state } = this
        state[event.target.id] = event.target.value
        this.setState({...state})
    }
    handleLogin = async (e) => {
        e.preventDefault()
        e.stopPropagation()
        const { login, senha } = this.state
        if (this.state.loading) return
        if (login && senha) {
            this.setState({loading: true})
            const token = await UserProvider.login({ login, senha })
            .then((token) => {
                debugger
                this.setState({loading: false})
                this.props.setLoggedUser(token)
                window.location.href = '/cliente?login=' + login
            })
            console.log(token)
        } else {
            alert('Preencha todos os campos', JSON.stringify(this.state))
        }
    }
    handleRegister = () => {
        debugger
        window.location.href = '/coming-soon'
    }

    openMapTab = () => {
        window.open(mapLink, '_blank')
    }

    render() {
        return (
            <Footer id='footer'>
                <LoginRegister
                    handleChange={this.handleChange}
                    handleLogin={this.handleLogin}
                    handleRegister={this.handleRegister}
                    {...this.state}
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