import React from 'react'

import ChangePasswordForm from '../../forms/change-password'

export default class AlterarSenhaSection extends React.Component {
    render() {
        const { } = this.props || []
        return (
            <React.Fragment>
                <h1>Alterar Senha</h1>
                <ChangePasswordForm />
            </React.Fragment>
        )
    }
}