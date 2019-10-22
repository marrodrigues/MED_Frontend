import React from 'react'
import styled from 'styled-components'

// import BaseForm from '../base/form'
import BaseLabel from '../base/label'
// import BaseInput from '../base/input'
import BaseButton from '../base/new/button'
import BaseForm from '../base/new/form'
import BaseInput from '../base/new/input'

import ClienteProvider from '../../providers/cliente'

const ChangePasswordForm = styled(BaseForm)`
    justify-content: center;
    > * {
        padding: 1vh 0;
    }
`
const StyledLabel = styled(BaseLabel)`
    color: #236C4A;
`

const StyledButton = styled(BaseButton)`
    margin: 1vh auto;
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
    onBlurConfirmation = () => {
        if (!this.isConfirmationValid()) {
            this.setState({newPassword: '', confirmNewPassword: ''})
            alert('A confirmação de senha falhou')
        } 
    }

    render () {
        return (
            <ChangePasswordForm onSubmit={this.submit}>
                <StyledLabel htmlFor='oldPassword'>Senha Antiga</StyledLabel>
                <BaseInput
                    value={this.state.oldPassword}
                    onChange={this.handleChange}
                    name='oldPassword'
                    id='oldPassword'
                    type='password'
                    noValidation
                />
                <StyledLabel htmlFor='newPassword'>Nova Senha</StyledLabel>
                <BaseInput
                    value={this.state.newPassword}
                    onChange={this.handleChange}
                    name='newPassword'
                    id='newPassword'
                    type='password'
                    noValidation
                />
                <StyledLabel htmlFor='confirmNewPassword'>Confirmar Nova Senha</StyledLabel>
                <BaseInput
                    value={this.state.confirmNewPassword}
                    onChange={this.handleChange}
                    name='confirmNewPassword'
                    id='confirmNewPassword'
                    type='password'
                    onBlur={this.onBlurConfirmation}
                />
                <StyledButton
                    type='submit'
                    disabled={!this.isConfirmationValid()}
                >
                    Alterar Senha
                </StyledButton>
            </ChangePasswordForm>
        ) 
    }
}