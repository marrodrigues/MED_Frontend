import React from 'react'
import styled from 'styled-components'
import axios from 'axios'

import { formatCep } from '../../util/string'
import config from '../../config'
import { ALLOWED_CITY, ALLOWED_DISTRICTS, FORM_INPUT_IDS } from '../../util/constants'

const CepInput = styled.input`
    border: 2px solid ${props => props.isValid ? 'green' : 'red'};
`

export default class extends React.Component {
    state = {
        cep: '',
        isCepValid: true
    }

    handleChange = (event) => {
        const cep = formatCep(event.target.value)
        this.setState({ cep })
        if (cep.length === 9) { this.validateCep(cep)}
        console.log(event.target, event.target.id, event.target.name)
        event.preventDefault();
        event.stopPropagation();
    }

    validateCep = (cep) => {
        if (cep.length < 9) { return }

        axios.get(config.VIA_CEP_ENDPOINT + cep + config.VIA_CEP_JSON)
            .then(response => response.data)
            .then(data => {
                if (data.erro) {
                    // invalid cep
                    this.setState({isCepValid: false})
                } else {
                    this.setState({isCepValid: this.isLocationValid(data)})
                } 
            })
            .catch(error => { console.log(error) })
    }

    isLocationValid = ({ localidade, bairro }) => {
        return localidade === ALLOWED_CITY && ALLOWED_DISTRICTS.includes(bairro)
    }

    render () {
        return (
            <React.Fragment>
                <label for={FORM_INPUT_IDS.CEP}>FORM_INPUT_IDS.CEP</label>
                <CepInput
                    maxLength={9}
                    value={this.state.cep}
                    onChange={this.handleChange}
                    name={FORM_INPUT_IDS.CEP}
                    id={FORM_INPUT_IDS.CEP}
                    isValid={this.state.isCepValid}
                />
            </React.Fragment>
        )
    }
}