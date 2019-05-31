import React from 'react'
import styled from 'styled-components'
import axios from 'axios'

import config from '../../../config'

import BaseInput from '../../base/input'
import BaseLabel from '../../base/label'

import { FORM_INPUT_IDS } from '../../../util/constants'

const EmailInput = styled(BaseInput)`
    
`

export default class extends React.Component {
    state = {
        email: '',
        isEmailValid: true
    }

    componentDidMount() {
        if(this.props.value) {
            this.setState({email: this.props.value})
        }
    }

    handleChange = (event) => {
        this.setState({ email: event.target.value })
        if (this.props.onChange) {this.props.onChange(event)}
        event.preventDefault();
        event.stopPropagation();
    }

    validateEmail = (event) => {
        const email = event.target.value
        console.log(email)
        // debugger
        axios.get('https://med-backend-dev.herokuapp.com/pessoas/email/' + email)
            .then(response => {
                // debugger
                this.setState({isEmailValid: false})
                console.log(response)
            })
            .catch(error => { 
                // debugger
                console.log(error)
                this.setState({isEmailValid: true})
            })
    }

    render () {
        return (
            <React.Fragment>
                <BaseLabel htmlFor={FORM_INPUT_IDS.EMAIL}>EMAIL</BaseLabel>
                <EmailInput
                    value={this.state.email}
                    onChange={this.handleChange}
                    onBlur={this.validateEmail}
                    name={FORM_INPUT_IDS.EMAIL}
                    id={FORM_INPUT_IDS.EMAIL}
                    isValid={this.state.isEmailValid}
                    type='email'
                />
            </React.Fragment>
        )
    }
}