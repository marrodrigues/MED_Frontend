import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { BaseForm, InputWithLabel } from '../base'
import { ButtonOrSpinner } from '../base/button'

const Form = styled(BaseForm)`
    max-width: 330px;
`

const ChangePasswordForm = ({}) => {
    const [senha, setSenha] = useState('')
    const [confirmacao, setConfirmacao] = useState('')
    const [error, setError] = useState({})
    const handleSubmit = e => {
        e.stopPropagation()
        e.preventDefault()
        // if (!senha) {
        //     error.senha = true
        //     return
        // }
        // if (!confirmacao || senha !== confirmacao) {
        //     error.confirmacao = true
        //     return
        // }
    }
    return (
        <Form title='Alterar Senha' key='change-password-form' id='change-password-form' onSubmit={handleSubmit}>
            <InputWithLabel
                label='Nova Senha'
                value={senha}
                onChange={setSenha}
                type='password'
            />
            <InputWithLabel
                label='Confirmação'
                value={confirmacao}
                onChange={setConfirmacao}
                type='password'
            />
            <ButtonOrSpinner label='Alterar' />
        </Form>
    )
}

export default ChangePasswordForm