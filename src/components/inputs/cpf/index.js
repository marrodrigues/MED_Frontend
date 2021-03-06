import React from 'react'
import styled from 'styled-components'
import axios from 'axios'

import config from '../../../config'

import BaseInput from '../../base/input'
import BaseLabel from '../../base/label'

import { FORM_INPUT_IDS } from '../../../util/constants'

const CPFInput = styled(BaseInput)`
    
`

export default class extends React.Component {
    state = {
        cpf: '',
        isCPFValid: true
    }

    componentDidMount () {
        if(this.props.value) {
            this.setState({cpf: this.props.value})
        }
    }

    handleChange = (event) => {
        this.setState({ cpf: event.target.value })
        if (this.props.onChange) {this.props.onChange(event)}
        event.preventDefault();
        event.stopPropagation();
    }

    validateCPF = (event) => {
        const cpf = event.target.value
        console.log(cpf)
        // // // debugger
        this.props.lockForm()
        axios.get('https://med-backend-dev.herokuapp.com/pessoas/cpf/' + cpf)
            .then(response => {
                // // // debugger
                this.setState({isCPFValid: false})
                this.props.existsCallback(response.data)
                console.log(response)
            })
            .catch(error => { 
                console.log(error)
                this.setState({isCPFValid: true})
                this.props.doesNotExistCallback()
            })
    }

    render () {
        return (
            <React.Fragment>
                <BaseLabel htmlFor={FORM_INPUT_IDS.CPF}>CPF</BaseLabel>
                <CPFInput
                    value={this.props.value}
                    onChange={this.handleChange}
                    onBlur={this.validateCPF}
                    name={FORM_INPUT_IDS.CPF}
                    id={FORM_INPUT_IDS.CPF}
                    isValid={this.state.isCPFValid}
                    disabled={this.props.disabled}
                    noValidation={this.props.noValidation}
                />
            </React.Fragment>
        )
    }
}