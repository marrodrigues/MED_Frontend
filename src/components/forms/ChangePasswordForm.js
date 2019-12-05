import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { BaseForm, InputWithLabel } from '../base'
import { ButtonOrSpinner } from '../base/button'
import {ClienteProvider} from "../../providers";
import {reloadWindow} from "../../util/constants";

const Form = styled(BaseForm)`
    max-width: 330px;
`

const ChangePasswordForm = ({clientList, initialValues}) => {
    const [senha, setSenha] = useState('')
    const [confirmacao, setConfirmacao] = useState('')
    const [error, setError] = useState({})
    const [selectedClient, setSelectedClient] = useState(null)
    useEffect(() => {
        const client = (clientList || []).find(client => client && client.pessoa && client.pessoa.id === Number(initialValues.id))
        console.log(client)
        setSelectedClient(client)
    }, [clientList, initialValues])
    const handleSubmit = e => {
        e.stopPropagation()
        e.preventDefault()
        if (!senha) { error.senha = true }
        else { error.senha = false}
        if (!confirmacao || senha !== confirmacao) { error.confirmacao = true }
        else { error.confirmacao = false}
        setError(error)
        if (Object.values(error).some(Boolean)) { return }
        ClienteProvider.createOrUpdate(
            {
                ...selectedClient.pessoa.endereco[0],
                ...selectedClient.pessoa.telefone[0],
                ...selectedClient.pessoa,
                ...selectedClient,
                senha
            },
            reloadWindow)
    }
    const onBlurConfirmacao = (e) => {
        // e.stopPropagation()
        // e.preventDefault()
        let _error = error
        debugger
        if (e.target.value !== senha) { _error.confirmacao = true }
        else { _error.confirmacao = false }
        setError(_error)
    }
    return (
        <Form title='Alterar Senha' key='change-password-form' id='change-password-form' onSubmit={handleSubmit}>
            {
                selectedClient &&
                    <>
                        <InputWithLabel
                            label='Nova Senha'
                            value={senha}
                            onChange={setSenha}
                            type='password'
                            isInvalid={error.senha}
                            errorMessage={error.senha && 'Senha inválida'}
                        />
                        <InputWithLabel
                            label='Confirmação'
                            value={confirmacao}
                            onChange={setConfirmacao}
                            type='password'
                            onBlur={onBlurConfirmacao}
                            isInvalid={error.confirmacao}
                            errorMessage={error.confirmacao && 'Senha e confirmação não conferem'}
                        />
                        <ButtonOrSpinner label='Alterar' />
                    </>
            }
        </Form>
    )
}

export default ChangePasswordForm