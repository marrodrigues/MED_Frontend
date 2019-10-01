import React from 'react'
import RegisterForm from '../../new-layout/register-form'

export default class MeusDadosSection extends React.Component {
    render() {
        const {} = this.props || []
        return (
            <React.Fragment>
                {/* <h1>Meus Dados</h1> */}
                <RegisterForm update/>
            </React.Fragment>
        )
    }
}