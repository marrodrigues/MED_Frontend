import React from 'react'
import RegisterForm from '../../components/register-form';
import Header from '../../components/header-v2'

export default class extends React.Component {
    render () {
        return (
            <React.Fragment>
                <Header />
                <RegisterForm />
            </React.Fragment>
        )
    }
}