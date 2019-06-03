// dependencies
import React from 'react'
import styled from 'styled-components'

// components
import CepInput from '../inputs/cep-input'
import EmailInput from '../inputs/email'
import LoginInput from '../inputs/login'
import CPFInput from '../inputs/cpf'
import BaseInput from '../base/input'
import BaseLabel from '../base/label'
import BaseForm from '../base/form'
import BaseButton from '../base/button'
import BaseFormTitle from '../base/form-title'

import Spinner from 'react-spinkit'

import { FORM_INPUT_IDS } from '../../util/constants'

import UserProvider from '../../providers/user'

const RegisterForm = styled(BaseForm)`
`

export default class extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            [FORM_INPUT_IDS.BAIRRO]: '',
            [FORM_INPUT_IDS.CEP]: '',
            [FORM_INPUT_IDS.CPF]: '',
            [FORM_INPUT_IDS.EMAIL]: '',
            [FORM_INPUT_IDS.LOGIN]: '',
            [FORM_INPUT_IDS.LOGRADOURO]: '',
            [FORM_INPUT_IDS.NASCIMENTO]: '',
            [FORM_INPUT_IDS.NOME]: '',
            [FORM_INPUT_IDS.NUMERO]: '',
            [FORM_INPUT_IDS.SENHA]: '',
            [FORM_INPUT_IDS.TELEFONE]: '',
            [FORM_INPUT_IDS.UF]: '',
            ...this.getPreRegisterValues()
        }
    }

    getPreRegisterValues() {
        if (window.location.search) {
            // const preRegisterValues = 
            return window.location.search
                .replace('?', '')
                .split('&')
                .reduce((acc, cur) => {
                    const keyAndValue = cur.split('=')
                    acc[keyAndValue[0]] = keyAndValue[1]
                    return acc
                }, {})
            // this.setState({...preRegisterValues}, () => {console.log(this.state);
        }
        return {}
    }


    submit = (e) => {
        // // // debugger
        e.preventDefault();
        UserProvider.create(this.state)
        // console.log('Submit');
    }

    handleChangeInput = (event) => {
        let currentState = this.state
        currentState[event.target.id] = event.target.value
        this.setState({ ...currentState })
    }

    render() {
        return (
            <RegisterForm onSubmit={this.submit}>
                <BaseFormTitle title='Cadastre-se' />
                <EmailInput
                    onChange={this.handleChangeInput}
                    value={this.state[FORM_INPUT_IDS.EMAIL]}
                />
                <LoginInput
                    onChange={this.handleChangeInput}
                    value={this.state[FORM_INPUT_IDS.LOGIN]}
                />
                <CPFInput
                    onChange={this.handleChangeInput}
                    value={this.state[FORM_INPUT_IDS.CPF]}
                />
                <BaseLabel htmlFor={FORM_INPUT_IDS.NOME}>NOME</BaseLabel>
                <BaseInput
                    id={FORM_INPUT_IDS.NOME}
                    name={FORM_INPUT_IDS.NOME}
                    noValidation
                    onChange={this.handleChangeInput}
                    value={this.state[FORM_INPUT_IDS.NOME]}
                />
                <BaseLabel htmlFor={FORM_INPUT_IDS.TELEFONE}>TELEFONE</BaseLabel>
                <BaseInput
                    id={FORM_INPUT_IDS.TELEFONE}
                    name={FORM_INPUT_IDS.TELEFONE}
                    noValidation
                    onChange={this.handleChangeInput}
                    value={this.state[FORM_INPUT_IDS.TELEFONE]}
                />
                
                <BaseLabel htmlFor={FORM_INPUT_IDS.SENHA}>SENHA</BaseLabel>
                <BaseInput
                    id={FORM_INPUT_IDS.SENHA}
                    name={FORM_INPUT_IDS.SENHA}
                    noValidation
                    onChange={this.handleChangeInput}
                    value={this.state[FORM_INPUT_IDS.SENHA]}
                />
                <BaseLabel htmlFor={FORM_INPUT_IDS.NASCIMENTO}>NASCIMENTO</BaseLabel>
                <BaseInput
                    id={FORM_INPUT_IDS.NASCIMENTO}
                    name={FORM_INPUT_IDS.NASCIMENTO}
                    noValidation
                    type='date'
                    onChange={this.handleChangeInput}
                    value={this.state[FORM_INPUT_IDS.NASCIMENTO]}
                />
                <CepInput
                    onChange={this.handleChangeInput}
                    value={this.state[FORM_INPUT_IDS.CEP]}
                />
                <BaseButton
                    type='submit'
                >
                    Cadastrar
                </BaseButton>
                {this.state.loading && <Spinner name='circle' />}
            </RegisterForm>
        )
    }
}
