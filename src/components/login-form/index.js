// dependencies
import React from 'react'
import styled from 'styled-components'

// constants
import { FORM_INPUT_IDS } from '../../util/constants'

// components
import BaseInput from '../base/input'
import BaseLabel from '../base/label'
import BaseForm from '../base/form'
import BaseButton from '../base/button'
import Spinner from 'react-spinkit'

import UserProvider from '../../providers/user'

const LoginForm = styled(BaseForm)`
    input {
        max-width: 300px;
    }
`


export default class extends React.Component {
    state = {
        loading: false,
        [FORM_INPUT_IDS.LOGIN]: '',
        [FORM_INPUT_IDS.SENHA]: ''
    }

    handleChangeInput = (event) => {
        let currentState = this.state
        currentState[event.target.id] = event.target.value
        this.setState({...currentState})
    }

    submit = async (e) => {
        e.preventDefault();
        e.stopPropagation()
        const { login, senha } = this.state
        if (login && senha) {
            this.setState({loading: true})
            const token = await UserProvider.login({login, senha})
            .then(() => {
                this.setState({loading: false})
            })
        } else {
            alert('Preencha todos os campos')
        }
    }

    render () {
        return (
            <LoginForm onSubmit={this.submit}>
                <BaseLabel htmlFor={FORM_INPUT_IDS.LOGIN}>Login</BaseLabel>
                <BaseInput
                    id={FORM_INPUT_IDS.LOGIN}
                    name={FORM_INPUT_IDS.LOGIN}
                    noValidation
                    onChange={this.handleChangeInput}
                    value={this.state[FORM_INPUT_IDS.LOGIN]}
                />
                <BaseLabel htmlFor={FORM_INPUT_IDS.SENHA}>Senha</BaseLabel>
                <BaseInput
                    id={FORM_INPUT_IDS.SENHA}
                    name={FORM_INPUT_IDS.SENHA}
                    noValidation
                    onChange={this.handleChangeInput}
                    value={this.state[FORM_INPUT_IDS.SENHA]}
                    type="password"
                />
                <BaseButton
                    type='submit'
                >
                    Entrar
                </BaseButton>
                {this.state.loading && <Spinner name='circle' />}
            </LoginForm>
        )
    }
}