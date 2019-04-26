// dependencies
import React from 'react'
import styled from 'styled-components'

// components
import CepInput from '../cep-input'

import { FORM_INPUT_IDS } from '../../util/constants'

const RegisterForm = styled.form`
    display: flex;
    flex-direction: column;
`

export default class extends React.Component {
    render () {
        return (
            <RegisterForm>
                <label for={FORM_INPUT_IDS.NOME}>FORM_INPUT_IDS.NOME</label>

                <input
                    id={FORM_INPUT_IDS.NOME}
                    name={FORM_INPUT_IDS.NOME}
                />
                <label for={FORM_INPUT_IDS.CPF}>FORM_INPUT_IDS.CPF</label>
                <input
                    id={FORM_INPUT_IDS.CPF}
                    name={FORM_INPUT_IDS.CPF}
                />
                <label for={FORM_INPUT_IDS.TELEFONE}>FORM_INPUT_IDS.TELEFONE</label>
                <input
                    id={FORM_INPUT_IDS.TELEFONE}
                    name={FORM_INPUT_IDS.TELEFONE}
                />
                <label for={FORM_INPUT_IDS.LOGIN}>FORM_INPUT_IDS.LOGIN</label>
                <input
                    id={FORM_INPUT_IDS.LOGIN}
                    name={FORM_INPUT_IDS.LOGIN}
                />
                <label for={FORM_INPUT_IDS.NASCIMENTO}>FORM_INPUT_IDS.NASCIMENTO</label>
                <input
                    id={FORM_INPUT_IDS.NASCIMENTO}
                    name={FORM_INPUT_IDS.NASCIMENTO}
                />
                <label for={FORM_INPUT_IDS.EMAIL}>FORM_INPUT_IDS.EMAIL</label>
                <input
                    id={FORM_INPUT_IDS.EMAIL}
                    name={FORM_INPUT_IDS.EMAIL}
                />
                <CepInput />
                <label for={FORM_INPUT_IDS.NOME}>FORM_INPUT_IDS.NOME</label>
                <input
                    id={FORM_INPUT_IDS.LOGRADOURO}
                    name={FORM_INPUT_IDS.LOGRADOURO}
                />
                <label for={FORM_INPUT_IDS.NOME}>FORM_INPUT_IDS.NOME</label>
                <input
                    id={FORM_INPUT_IDS.NUMERO}
                    name={FORM_INPUT_IDS.NUMERO}
                />
                <label for={FORM_INPUT_IDS.NOME}>FORM_INPUT_IDS.NOME</label>
                <input
                    id={FORM_INPUT_IDS.BAIRRO}
                    name={FORM_INPUT_IDS.BAIRRO}
                />
                <label for={FORM_INPUT_IDS.NOME}>FORM_INPUT_IDS.NOME</label>
                <input
                    id={FORM_INPUT_IDS.UF}
                    name={FORM_INPUT_IDS.UF}
                />
                <label for={FORM_INPUT_IDS.NOME}>FORM_INPUT_IDS.NOME</label>
                <input
                    id={FORM_INPUT_IDS.CIDADE}
                    name={FORM_INPUT_IDS.CIDADE}
                />
                Cadastrar
            </RegisterForm>
        )
    }
}
