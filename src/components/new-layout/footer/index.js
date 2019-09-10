import  React from 'react'
import styled from 'styled-components'

import ActionButton from '../button'
import UserProvider from '../../../providers/user'

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
class FooterComponent extends React.Component {
    state = {
        login: '',
        password: '',
        cep: '',
        number: '',
    }
    handleChange = (event) => {
        const { state } = this
        state[event.target.id] = event.target.value
        this.setState({...state})
    }
    handleLogin = async (e) => {
        e.preventDefault()
        e.stopPropagation()
        const { login, password } = this.state
        if (this.state.loading) return
        if (login && password) {
            this.setState({loading: true})
            const token = await UserProvider.login({login, senha: password})
            .then((token) => {
                debugger
                this.setState({loading: false})
                this.props.setLoggedUser(token)
                window.location.href = '/#header'
            })
            console.log(token)
        } else {
            alert('Preencha todos os campos')
        }
    }
    handleRegister = () => {
        window.location.href = '/coming-soon'
    }

    render() {
        return (
            <Footer id='footer'>
                <LoginAndRegisterContainer>
                    <LoginContainer>
                        <Label>Login</Label>
                        <Input 
                            id='login'
                            value={this.state.login}
                            onChange={this.handleChange}
                            placeholder='login'
                            name='login'
                        />
                        <Input 
                            id='password'
                            type='password'
                            value={this.state.password}
                            onChange={this.handleChange}
                            placeholder='senha'       
                            name='senha'              
                        />
                        <ActionButton type='button' action={this.handleLogin} buttonText='Entrar'/>
                    </LoginContainer>
                    <RegisterForm action='/register' method='GET'>
                        <Label>Cadastro</Label>
                        <InputsContainer>
                            <Input 
                                id='cep'
                                value={this.state.cep}
                                onChange={this.handleChange}
                                placeholder='cep'
                                name='CEP'
                            />
                            <Input 
                                id='number'
                                value={this.state.number}
                                onChange={this.handleChange}
                                placeholder='número'
                                type='number'
                                name='numero'
                            />
                        </InputsContainer>
                        <ActionButton type='submit' buttonText ='Registrar'/>
                    </RegisterForm>
                </LoginAndRegisterContainer>
                <ContactInfo>
                    <Map src={'/image/map.png'}/>
                    <Contact dangerouslySetInnerHTML={{__html: contact}} />
                </ContactInfo>
            </Footer>
        )
    }
} 

export default FooterComponent