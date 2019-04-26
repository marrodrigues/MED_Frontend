// dependencies
import React from 'react'
import styled from 'styled-components'

// components
import CepInput from '../cep-input'
import BaseInput from '../base/input'
import BaseLabel from '../base/label'
import BaseForm from '../base/form'

import { FORM_INPUT_IDS } from '../../util/constants'

const RegisterForm = styled(BaseForm)`
`

export default class extends React.Component {
    state = {
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
    }


    submit = (e) => {
        debugger
        e.preventDefault();
        console.log('Submit');
    }

    handleChangeInput = (event) => {
        let currentState = this.state
        currentState[event.target.id] = event.target.value
        this.setState({...currentState})
    }

    render () {
        return (
            <RegisterForm onSubmit={this.submit}>
                <BaseLabel htmlFor={FORM_INPUT_IDS.NOME}>NOME</BaseLabel>
                <BaseInput
                    id={FORM_INPUT_IDS.NOME}
                    name={FORM_INPUT_IDS.NOME}
                    noValidation
                    onChange={this.handleChangeInput}
                    value={this.state[FORM_INPUT_IDS.NOME]}
                />
                <BaseLabel htmlFor={FORM_INPUT_IDS.CPF}>CPF</BaseLabel>
                <BaseInput
                    id={FORM_INPUT_IDS.CPF}
                    name={FORM_INPUT_IDS.CPF}
                    noValidation
                    onChange={this.handleChangeInput}
                    value={this.state[FORM_INPUT_IDS.CPF]}
                />
                <BaseLabel htmlFor={FORM_INPUT_IDS.TELEFONE}>TELEFONE</BaseLabel>
                <BaseInput
                    id={FORM_INPUT_IDS.TELEFONE}
                    name={FORM_INPUT_IDS.TELEFONE}
                    noValidation
                    onChange={this.handleChangeInput}
                    value={this.state[FORM_INPUT_IDS.TELEFONE]}
                />
                <BaseLabel htmlFor={FORM_INPUT_IDS.LOGIN}>LOGIN</BaseLabel>
                <BaseInput
                    id={FORM_INPUT_IDS.LOGIN}
                    name={FORM_INPUT_IDS.LOGIN}
                    noValidation
                    onChange={this.handleChangeInput}
                    value={this.state[FORM_INPUT_IDS.LOGIN]}
                />
                <BaseLabel htmlFor={FORM_INPUT_IDS.NASCIMENTO}>NASCIMENTO</BaseLabel>
                <BaseInput
                    id={FORM_INPUT_IDS.NASCIMENTO}
                    name={FORM_INPUT_IDS.NASCIMENTO}
                    noValidation
                    onChange={this.handleChangeInput}
                    value={this.state[FORM_INPUT_IDS.NASCIMENTO]}
                />
                <BaseLabel htmlFor={FORM_INPUT_IDS.EMAIL}>EMAIL</BaseLabel>
                <BaseInput
                    id={FORM_INPUT_IDS.EMAIL}
                    name={FORM_INPUT_IDS.EMAIL}
                    noValidation
                    onChange={this.handleChangeInput}
                    value={this.state[FORM_INPUT_IDS.EMAIL]}
                />
                <CepInput />
                <BaseLabel htmlFor={FORM_INPUT_IDS.LOGRADOURO}>LOGRADOURO</BaseLabel>
                <BaseInput
                    id={FORM_INPUT_IDS.LOGRADOURO}
                    name={FORM_INPUT_IDS.LOGRADOURO}
                    noValidation
                    onChange={this.handleChangeInput}
                    value={this.state[FORM_INPUT_IDS.LOGRADOURO]}
                />
                <BaseLabel htmlFor={FORM_INPUT_IDS.NUMERO}>NUMERO</BaseLabel>
                <BaseInput
                    id={FORM_INPUT_IDS.NUMERO}
                    name={FORM_INPUT_IDS.NUMERO}
                    noValidation
                    onChange={this.handleChangeInput}
                    value={this.state[FORM_INPUT_IDS.NUMERO]}
                />
                <BaseLabel htmlFor={FORM_INPUT_IDS.BAIRRO}>BAIRRO</BaseLabel>
                <BaseInput
                    id={FORM_INPUT_IDS.BAIRRO}
                    name={FORM_INPUT_IDS.BAIRRO}
                    noValidation
                    onChange={this.handleChangeInput}
                    value={this.state[FORM_INPUT_IDS.BAIRRO]}
                />
                <BaseLabel htmlFor={FORM_INPUT_IDS.UF}>UF</BaseLabel>
                <BaseInput
                    id={FORM_INPUT_IDS.UF}
                    name={FORM_INPUT_IDS.UF}
                    noValidation
                    onChange={this.handleChangeInput}
                    value={this.state[FORM_INPUT_IDS.UF]}
                />
                <BaseLabel htmlFor={FORM_INPUT_IDS.CIDADE}>CIDADE</BaseLabel>
                <BaseInput
                    id={FORM_INPUT_IDS.CIDADE}
                    name={FORM_INPUT_IDS.CIDADE}
                    noValidation
                    onChange={this.handleChangeInput}
                    value={this.state[FORM_INPUT_IDS.CIDADE]}
                />
                <input
                    type='submit'
                    value='Cadastrar'
                />
            </RegisterForm>
        )
    }
}
