import React from 'react'
import styled from 'styled-components'

import BaseForm from '../base/form'
import BaseLabel from '../base/label'
import BaseInput from '../base/input'
import BaseButton from '../base/button'

import ClienteProvider from '../../providers/cliente'

const ChangePasswordForm = styled(BaseForm)`
`

export default class extends React.Component {
    state = {
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value}) 
    }

    isConfirmationValid = () => this.state.newPassword && this.state.newPassword === this.state.confirmNewPassword

    submit = (event) => {
        event.preventDefault()
        event.stopPropagation()
        ClienteProvider.changePassword('formData', 'callback')
    }

    render () {
        return (
            <ChangePasswordForm onSubmit={this.submit}>
                <BaseLabel htmlFor='oldPassword'>Senha Antiga</BaseLabel>
                <BaseInput
                    value={this.state.oldPassword}
                    onChange={this.handleChange}
                    name='oldPassword'
                    id='oldPassword'
                    type='password'
                    noValidation
                />
                <BaseLabel htmlFor='newPassword'>Nova Senha</BaseLabel>
                <BaseInput
                    value={this.state.newPassword}
                    onChange={this.handleChange}
                    name='newPassword'
                    id='newPassword'
                    type='password'
                    noValidation
                />
                <BaseLabel htmlFor='confirmNewPassword'>Confirmar Nova Senha</BaseLabel>
                <BaseInput
                    value={this.state.confirmNewPassword}
                    onChange={this.handleChange}
                    name='confirmNewPassword'
                    id='confirmNewPassword'
                    type='password'
                    isValid={this.isConfirmationValid()}
                />
                <BaseButton
                    type='submit'
                    disabled={!this.isConfirmationValid()}
                >
                    Alterar Senha
                </BaseButton>
            </ChangePasswordForm>
        ) 
    }
}