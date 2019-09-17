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

const LoginAndRegisterContainer = styled.div`
    display: flex;
    flex-direction: column;
`
const LoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 120px;
    justify-content: space-evenly;
`

const RegisterForm = styled.form`
    display: flex;
    flex-direction: column;
    padding-top: 3vh;
`

const InputsContainer = styled.div`
    display: flex;
    justify-content: space-evenly;

    >:first-child {
        margin-right: 2vw;
    }
`

const Label = styled.span`
    font: 22px Helvetica;
    color: #FFFFFF;
`

const Input = styled.input`
    font: 14px Helvetica;
    border-left: 2px solid yellow;
    border-radius: 5px;
    padding: 5px 10px;
    margin-top: 5px;
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
`
const Contact = styled.p`
    margin-top: 2vh;
    padding: 1vh 1vw;
    border-left: solid 1px yellow;
    color: #FFFFFF;
`
const contact = 'Rua: São Fco. Xavier - N: 20<br />Maracanã - Rio de Janeiro / RJ<br /><br />Tel.: 21- 3456-8976 / 8763-0912'

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
                    <Map src={'/image/map.png'}/>
                    <Contact dangerouslySetInnerHTML={{__html: contact}} />
                </ContactInfo>
            </Footer>
        )
    }
} 

export default FooterComponent