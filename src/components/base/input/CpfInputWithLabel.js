import React, { useState } from 'react'
import { connect } from 'react-redux'
import { setLoading, setNotLoading } from '../../../actions'

import { InputWithLabel } from '../'
import {formatCpf, removeNonNumericDigits} from '../../../util/string'
import { validateCpf } from '../../../util/validation'

const CpfInputWithLabel = ({ value, cpfExistsCallback = () => {}, cpfNotFoundCallback = () => {}, isInvalid, setIsLoading, setIsNotLoading, ...props }) => {
    const [isInvalidCpf, setInvalidCpf] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const onBlur = e => {
        setIsLoading()
        const cpf = e.target.value
        validateCpf(removeNonNumericDigits(cpf))
            .then(response => response.data)
            .then(data => {
                cpfExistsCallback(data)
            })
            .catch(error => {
                if (error.response.status === 404) {
                    cpfNotFoundCallback()
                } else {
                    console.log(JSON.stringify(error))
                }
            })
            .finally(() => {
                setIsNotLoading()
            })
    }

    return (
        <InputWithLabel
            {...props}
            maxLength={14}
            label='CPF'
            value={formatCpf(value)}
            onBlur={onBlur}
            isInvalid={isInvalid || isInvalidCpf}
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

export default connect(mapStateToProps, mapDispatchToProps)(CpfInputWithLabel)