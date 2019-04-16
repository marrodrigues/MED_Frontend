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
            <section class="section-book">
                <div class="row">
                    <div class="book">
                        <div class="book__form">
                            <div class="row">
                                <div class="col-1-of-2">
                                    <form action="#" class="form">
                                        <div class="u-margin-bottom-medium">
                                            <h2 class="heading-secondary--white">
                                                Cadastre-se
                                            </h2>
                                        </div>

                                        <div class="form__group">
                                            <input type="text" class="form__input" placeholder="CEP" id="CEP" required/>
                                            <label for="CEP" class="form__label">CEP</label>
                                        </div>

                                        <div class="form__group">
                                            <input type="text" class="form__input" placeholder="Número" id="numero" required/>
                                            <label for="numero" class="form__label">Número</label>
                                        </div>

                                        <div class="form__group">
                                            <button class="btn btn--green">Cadastre-se</button>
                                        </div>
                                    </form>
                                </div>
                                <div class="col-1-of-2">
                                    <form action="#" class="form">

                                            <div class="u-margin-bottom-medium">
                                                    <h2 class="heading-secondary--white">
                                                        Login
                                                    </h2>
                                            </div>

                                        <div class="form__group">
                                            <input type="text" class="form__input" placeholder="Login" id="login" required/>
                                            <label for="login" class="form__label">Login</label>
                                        </div>

                                        <div class="form__group">
                                            <input type="password" class="form__input" placeholder="Senha" id="senha" required/>
                                            <label for="senha" class="form__label">Senha</label>
                                        </div>

                                        <div class="form__group">
                                            <button class="btn btn--green">Login</button>
                                        </div>
                                    </form>
                                </div>
                            </div>    
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}