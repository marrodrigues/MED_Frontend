import React from 'react'
import styled from 'styled-components'
import axios from 'axios'

import config from '../../../config'

import BaseInput from '../../base/input'
import BaseLabel from '../../base/label'

import { FORM_INPUT_IDS } from '../../../util/constants'

const LoginInput = styled(BaseInput)`
    
`

export default class extends React.Component {
    state = {
        login: '',
        isLoginValid: true
    }

    handleChange = (event) => {
        this.setState({ login: event.target.value })
        if (this.props.onChange) {this.props.onChange(event)}
        event.preventDefault();
        event.stopPropagation();
    }

    validateLogin = (event) => {
        const login = event.target.value
        console.log(login)
        // debugger
        axios.get('https://med-backend-dev.herokuapp.com/pessoas/login/' + login)
            .then(response => {
                // debugger
                this.setState({isLoginValid: false})
                console.log(response)
            })
            .catch(error => { 
                console.log(error)
                this.setState({isLoginValid: true})
            })
    }
    
    render () {
        return (
            <React.Fragment>
                <BaseLabel htmlFor={FORM_INPUT_IDS.LOGIN}>LOGIN</BaseLabel>
                <LoginInput
                    value={this.state.login}
                    onChange={this.handleChange}
                    onBlur={this.validateLogin}
                    name={FORM_INPUT_IDS.LOGIN}
                    id={FORM_INPUT_IDS.LOGIN}
                    isValid={this.state.isLoginValid}
                    type='login'
                />
            </React.Fragment>
        )
    }
}