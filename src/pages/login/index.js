import React from 'react'

import LoginForm from '../../components/login-form'
import Header from '../../components/header-v2'
import Footer from '../../components/footer'
import Hero from '../../components/hero'

import { KEYS } from '../../util/constants'

export default class extends React.Component {
    componentDidMount () {
        const token = window.localStorage.getItem(KEYS.TOKEN)
        if (token) {
            alert('Você já esta logado e será redirecionado para home')
            window.location.href = '/'
        }
    }

    render () {
        return (
            <React.Fragment>
                <Header />
                <Hero>
                    <LoginForm />
                </Hero>
                <Footer />
            </React.Fragment>
        )       
    }
}