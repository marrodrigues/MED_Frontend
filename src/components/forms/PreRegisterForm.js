import React, { useState } from 'react'
import { connect } from 'react-redux';
import { setLoading, setNotLoading } from '../../actions'

import { BaseForm, InputWithLabel, CepInputWithLabel } from '../base'
import { ButtonOrSpinner } from '../base/button';

const PreRegisterForm = ({ loading, onClickButton, resetLoading }) => {
    const [cep, setCep] = useState('')
    const [numero, setNumero] = useState('')
    const errorsInitalState = {cep: false, numero: false}
    const [errors, setErrors] = useState(errorsInitalState)
    const validateInputs = () => {
        let errors = errorsInitalState
        if (!cep) errors.login = true
        if (!numero) errors.password = true
        setErrors(errors)
    }
    const handleSubmit = e => {
        onClickButton()
        e.preventDefault()
        e.stopPropagation()
        validateInputs()
        if (Object.values(errors).some(field => field)) {
            resetLoading()    
            return
        }
    }

    return (
        <BaseForm key='pre-register-form' id='pre-register-form' onSubmit={handleSubmit}>
            <CepInputWithLabel 
                label='CEP'
                value={cep}
                onChange={setCep}
                isInvalid={errors.cep}
                labelColor='white'
            />
            <InputWithLabel 
                label='Número da residência'
                value={numero}
                onChange={setNumero}
                isInvalid={errors.numero}
                labelColor='white'
            />
            <ButtonOrSpinner label='Cadastrar'/>
        </BaseForm>
    )
}
const mapStateToProps = state => {
    const { app } = state
    const { loading } = app
    return { loading }
}

const mapDispatchToProps = dispatch => ({
    onClickButton: () => {
        dispatch(setLoading())
    },
    resetLoading: () => {
        dispatch(setNotLoading())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(PreRegisterForm)