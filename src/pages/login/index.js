import React from 'react';
import styled from 'styled-components'

import logoMedBranco from '../../assets/img/logo-med-branco.png'
// import {Header} from '../../components/header'

const Container = styled.main`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
`

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 50vh;
    height: fit-content;
    min-width: 75vw;
    input {
        font-size: calc(14px + 1vw);
        border: 2px solid lightgray;
        border-radius: 5px;
        padding: 1vh 1vw;
    }
    color: black;
    font-size: calc(14px + 1vw)
`

const StyledButton = styled.button`
    background: lightgreen;
    font-size: 12px;
    border: 2px solid lightgray;
    border-radius: 20px;
    padding: 1vh 1vw;
`

export default class extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            showLoginForm: true
        }
    }

    changeFormToRender = () => {this.setState({showLoginForm: !this.state.showLoginForm})}

    render() {
        const { showLoginForm } = this.state;
        return (
            <React.Fragment>
                <header class="header">
                    <nav>
                        <div class="row">
                            <div class="header__logo-box">
                                <img src={logoMedBranco} alt="logo" class="header__logo" onClick={() => {window.location.href = '/'}}/>
                            </div>
                            <ul class="main-nav">
                                <li class="main-nav__item"><a href="#" class="main-nav__item__link">Sobre Nós</a></li>
                                <li class="main-nav__item"><a href="#" class="main-nav__item__link">Menu</a></li>
                                <li class="main-nav__item"><a href="/login/" class="main-nav__item__link">Cadastro / Login</a></li>
                            </ul>
                        </div>
                    </nav>
                    <Container>
                        {
                            showLoginForm
                            ? (<StyledForm>
                                    E-mail: <input type="email" name="email"/><br/>
                                    Senha: <input type="password" name="password"/><br/>
                                    <input type="submit" value="Entrar"/>
                                </StyledForm>)
                            : (<StyledForm>
                                Nome: <input type="text" name="email"/><br/>
                                E-mail: <input type="email" name="email"/><br/>
                                Senha: <input type="password" name="password"/><br/>
                                <input type="submit" value="Entrar"/>
                                </StyledForm>)
                        }
                        
                        
                    </Container>
                </header>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <StyledButton onClick={this.changeFormToRender}>
                        {showLoginForm ? 'Ainda não possui cadastro?' : 'Já tenho um cadastro'}
                    </StyledButton>
                </div>
            </React.Fragment>
        )
    }
}