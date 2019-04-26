import React from 'react'
import RegisterForm from '../../components/register-form';
import Header from '../../components/header-v2'
import Footer from '../../components/footer'

export default class extends React.Component {
    render () {
        return (
            <React.Fragment>
                <Header />
                <RegisterForm />
                <Footer />
            </React.Fragment>
        )
    }
}