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

    handleChange = (event) => {
        this.setState({ cpf: event.target.value })
        if (this.props.onChange) {this.props.onChange(event)}
        event.preventDefault();
        event.stopPropagation();
    }

    validateCPF = (event) => {
        const cpf = event.target.value
        console.log(cpf)
        debugger
        axios.get('https://med-backend-dev.herokuapp.com/valida/cpf/' + cpf)
            .then(response => {
                debugger
                this.setState({isCPFValid: true})
                console.log(response)
            })
            .catch(error => { 
                console.log(error)
                this.setState({isCPFValid: false})
            })
    }

    render () {
        return (
            <React.Fragment>
                <BaseLabel htmlFor={FORM_INPUT_IDS.CPF}>CPF</BaseLabel>
                <CPFInput
                    value={this.state.cpf}
                    onChange={this.handleChange}
                    onBlur={this.validateCPF}
                    name={FORM_INPUT_IDS.CPF}
                    id={FORM_INPUT_IDS.CPF}
                    isValid={this.state.isCPFValid}
                    type='cpf'
                />
            </React.Fragment>
        )
    }
}