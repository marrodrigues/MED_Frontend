import React, { useState } from 'react'
import { connect } from 'react-redux'
import { setLoading, setNotLoading } from '../../../actions'

import { InputWithLabel } from '../'
import { formatCep } from '../../../util/string'
import { validateCep, isLocationValid } from '../../../util/validation'

const CepInputWithLabel = ({ value, validCepCallback, isInvalid, setIsLoading, setIsNotLoading, ...props }) => {
    const [isInvalidCep, setInvalidCep] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const onBlur = (e) => {
        setIsLoading()
        const cep = e.target.value
        if (cep.length < 9) {
            setIsNotLoading()
            setErrorMessage('CEP inválido')
            setInvalidCep(true)
            return
        }
        validateCep(cep)
            .then(response => response.data)
            .then(data => {
                debugger
                if (data.erro) {
                    setErrorMessage('CEP inválido')
                    setInvalidCep(true)
                } else if (!isLocationValid(data)) {
                    setErrorMessage('Não entregamos nessa região')
                    setInvalidCep(true)
                } else {
                    validCepCallback(data)
                    setErrorMessage('')
                    setInvalidCep(false)
                }
            })
            .catch(error => {
                console.log(error);
                setInvalidCep(true)
            })
            .finally(() => {
                setIsNotLoading()
            })
    }

    return (
        <InputWithLabel
            {...props}
            value={formatCep(value)}
            maxLength={9}
            label='CEP'
            onBlur={onBlur}
            isInvalid={isInvalid || isInvalidCep}
            errorMessage={errorMessage}
        />
    )
}
const mapStateToProps = state => {
    const { app } = state
    const { loading } = app
    return { loading }
}
const mapDispatchToProps = dispatch => ({
    setIsLoading: () => {
        dispatch(setLoading())
    },
    setIsNotLoading: () => {
        dispatch(setNotLoading())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(CepInputWithLabel)