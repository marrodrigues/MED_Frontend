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
    const [disableButton, setDisableButton] = useState(true)
    const validCepCallback = () => {
        setDisableButton(false)
    }
    const validateInputs = () => {
        let errors = errorsInitalState
        if (!cep) errors.cep = true
        if (!numero) errors.numero = true
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
        window.location.href = '/register?CEP=' +  cep + '&numero=' + numero
    }

    return (
        <BaseForm key='pre-register-form' id='pre-register-form' onSubmit={handleSubmit}>
            <CepInputWithLabel 
                label='CEP'
                value={cep}
                onChange={setCep}
                isInvalid={errors.cep}
                labelColor='white'
                validCepCallback={validCepCallback}
            />
            <InputWithLabel 
                label='Número da residência'
                value={numero}
                onChange={setNumero}
                isInvalid={errors.numero}
                labelColor='white'
            />
            <ButtonOrSpinner label='Cadastrar' disabled={disableButton || errors.cep}/>
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