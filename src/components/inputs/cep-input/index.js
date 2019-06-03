import React from 'react'
import styled from 'styled-components'
import axios from 'axios'

import { formatCep } from '../../../util/string'
import config from '../../../config'
import { ALLOWED_CITY, ALLOWED_DISTRICTS, FORM_INPUT_IDS } from '../../../util/constants'

import BaseInput from '../../base/input'
import BaseLabel from '../../base/label'

const CepInput = styled(BaseInput)`
    
`

export default class extends React.Component {
    state = {
        cep: '',
        numero: '',
        complemento: '',
        isCepValid: true,
        logradouro: '',
        bairro: '',
        uf: '',
        cidade: ''
    }   

    componentDidMount () {
        if(this.props.value) {
            this.setState({cep: this.props.value})
        }
    }

    handleChange = (event) => {
        const cep = formatCep(event.target.value)
        this.setState({ cep })
        if (this.props.onChange) {this.props.onChange(event)}
        if (cep.length === 9) { this.validateCep(cep)}
        event.preventDefault();
        event.stopPropagation();
    }
    handleChangeInput = (event) => {
        event.preventDefault()
        event.stopPropagation()
        this.setState({ [event.target.name]: event.target.value })
        if (this.props.onChange) {this.props.onChange(event)}
    }

    validateCep = (cep) => {
        if (cep.length < 9) { return }

        axios.get(config.VIA_CEP_ENDPOINT + cep + config.VIA_CEP_JSON)
            .then(response => response.data)
            .then(data => {
                // debugger
                if (data.erro) {
                    // invalid cep
                    this.setState({isCepValid: false})
                } else {
                    const { logradouro, bairro, localidade, uf } = data
                    const cepObj = { logradouro, bairro, cidade: localidade, uf }
                    this.setState({
                        isCepValid: this.isLocationValid(data), 
                        ...cepObj
                    }, () => {this.props.successCallback(cepObj)})
                } 
            })
            .catch(error => { console.log(error) })
    }

    isLocationValid = ({ localidade, bairro }) => {
        return localidade === ALLOWED_CITY && ALLOWED_DISTRICTS.includes(bairro)
    }

    // shouldComponentUpdate(nextProps) {
    //     if (nextProps.value === this.props.value) {
    //         return false
    //     }
    //     this.validateCep(nextProps.value)
    //     return true
    // }

    render () {
        return (
            <React.Fragment>
                <BaseLabel htmlFor={FORM_INPUT_IDS.CEP}>CEP</BaseLabel>
                <CepInput
                    {...this.props}
                    maxLength={9}
                    value={this.props.value}
                    onChange={this.handleChange}
                    name={FORM_INPUT_IDS.CEP}
                    id={FORM_INPUT_IDS.CEP}
                    isValid={this.state.isCepValid}
                />
                <BaseLabel htmlFor={FORM_INPUT_IDS.LOGRADOURO}>LOGRADOURO</BaseLabel>
                <BaseInput
                    id={FORM_INPUT_IDS.LOGRADOURO}
                    name={FORM_INPUT_IDS.LOGRADOURO}
                    noValidation
                    onChange={this.handleChangeInput}
                    value={this.props.logradouroValue}
                    disabled
                />
                <BaseLabel htmlFor={FORM_INPUT_IDS.NUMERO}>NUMERO</BaseLabel>
                <BaseInput
                    {...this.props}
                    id={FORM_INPUT_IDS.NUMERO}
                    name={FORM_INPUT_IDS.NUMERO}
                    noValidation
                    onChange={this.handleChangeInput}
                    value={this.props.numeroValue}
                    type='number'
                />
                <BaseLabel htmlFor={FORM_INPUT_IDS.COMPLEMENTO}>COMPLEMENTO</BaseLabel>
                <BaseInput
                    {...this.props}
                    id={FORM_INPUT_IDS.COMPLEMENTO}
                    name={FORM_INPUT_IDS.COMPLEMENTO}
                    noValidation
                    onChange={this.handleChangeInput}
                    value={this.props.complementoValue}
                />
                <BaseLabel htmlFor={FORM_INPUT_IDS.BAIRRO}>BAIRRO</BaseLabel>
                <BaseInput
                    id={FORM_INPUT_IDS.BAIRRO}
                    name={FORM_INPUT_IDS.BAIRRO}
                    noValidation
                    onChange={this.handleChangeInput}
                    value={this.props.bairroValue}
                    disabled
                />
                <BaseLabel htmlFor={FORM_INPUT_IDS.UF}>UF</BaseLabel>
                <BaseInput
                    id={FORM_INPUT_IDS.UF}
                    name={FORM_INPUT_IDS.UF}
                    noValidation
                    onChange={this.handleChangeInput}
                    value={this.props.ufValue}
                    disabled
                />
                <BaseLabel htmlFor={FORM_INPUT_IDS.CIDADE}>CIDADE</BaseLabel>
                <BaseInput
                    id={FORM_INPUT_IDS.CIDADE}
                    name={FORM_INPUT_IDS.CIDADE}
                    noValidation
                    onChange={this.handleChangeInput}
                    value={this.props.cidadeValue}
                    disabled
                />
            </React.Fragment>
        )
    }
}