import React from 'react'
import RegisterForm from '../../components/new-layout/register-form';
import Header from '../../components/new-layout/header'

export default class extends React.Component {
    render () {
        return (
            <React.Fragment>
                {/* <Header /> */}
                <RegisterForm />
            </React.Fragment>
        )
    }
}