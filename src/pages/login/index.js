import React from 'react'

import LoginForm from '../../components/login-form'
import Header from '../../components/header-v2'
import Footer from '../../components/footer'

export default class extends React.Component {
    render () {
        return (
            <React.Fragment>
                <Header />
                <LoginForm />
                <Footer />
            </React.Fragment>
        )       
    }
}