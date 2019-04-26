import React from 'react'

import LoginForm from '../../components/login-form'
import Header from '../../components/header-v2'

export default class extends React.Component {
    render () {
        return (
            <React.Fragment>
                <Header />
                <LoginForm />
            </React.Fragment>
        )       
    }
}