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

    submit = () => {
        console.log('Submit');
    }

    render () {
        return (
            <RegisterForm>
                <BaseLabel htmlFor={FORM_INPUT_IDS.NOME}>NOME</BaseLabel>
                <BaseInput
                    id={FORM_INPUT_IDS.NOME}
                    name={FORM_INPUT_IDS.NOME}
                    noValidation
                />
                <BaseLabel htmlFor={FORM_INPUT_IDS.CPF}>CPF</BaseLabel>
                <BaseInput
                    id={FORM_INPUT_IDS.CPF}
                    name={FORM_INPUT_IDS.CPF}
                    noValidation
                />
                <BaseLabel htmlFor={FORM_INPUT_IDS.TELEFONE}>TELEFONE</BaseLabel>
                <BaseInput
                    id={FORM_INPUT_IDS.TELEFONE}
                    name={FORM_INPUT_IDS.TELEFONE}
                    noValidation
                />
                <BaseLabel htmlFor={FORM_INPUT_IDS.LOGIN}>LOGIN</BaseLabel>
                <BaseInput
                    id={FORM_INPUT_IDS.LOGIN}
                    name={FORM_INPUT_IDS.LOGIN}
                    noValidation
                />
                <BaseLabel htmlFor={FORM_INPUT_IDS.NASCIMENTO}>NASCIMENTO</BaseLabel>
                <BaseInput
                    id={FORM_INPUT_IDS.NASCIMENTO}
                    name={FORM_INPUT_IDS.NASCIMENTO}
                    noValidation
                />
                <BaseLabel htmlFor={FORM_INPUT_IDS.EMAIL}>EMAIL</BaseLabel>
                <BaseInput
                    id={FORM_INPUT_IDS.EMAIL}
                    name={FORM_INPUT_IDS.EMAIL}
                    noValidation
                />
                <CepInput />
                <BaseLabel htmlFor={FORM_INPUT_IDS.LOGRADOURO}>LOGRADOURO</BaseLabel>
                <BaseInput
                    id={FORM_INPUT_IDS.LOGRADOURO}
                    name={FORM_INPUT_IDS.LOGRADOURO}
                    noValidation
                />
                <BaseLabel htmlFor={FORM_INPUT_IDS.NUMERO}>NUMERO</BaseLabel>
                <BaseInput
                    id={FORM_INPUT_IDS.NUMERO}
                    name={FORM_INPUT_IDS.NUMERO}
                    noValidation
                />
                <BaseLabel htmlFor={FORM_INPUT_IDS.BAIRRO}>BAIRRO</BaseLabel>
                <BaseInput
                    id={FORM_INPUT_IDS.BAIRRO}
                    name={FORM_INPUT_IDS.BAIRRO}
                    noValidation
                />
                <BaseLabel htmlFor={FORM_INPUT_IDS.UF}>UF</BaseLabel>
                <BaseInput
                    id={FORM_INPUT_IDS.UF}
                    name={FORM_INPUT_IDS.UF}
                    noValidation
                />
                <BaseLabel htmlFor={FORM_INPUT_IDS.CIDADE}>CIDADE</BaseLabel>
                <BaseInput
                    id={FORM_INPUT_IDS.CIDADE}
                    name={FORM_INPUT_IDS.CIDADE}
                    noValidation
                />
                <button
                    onClick={this.submit}
                >
                    Cadastrar
                </button>
            </RegisterForm>
        )
    }
}
