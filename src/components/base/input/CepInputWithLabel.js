import React, { useState } from 'react'

import { InputWithLabel } from '../'
import { formatCep } from '../../../util/string'
import { validateCep, isLocationValid } from '../../../util/validation'

const CepInputWithLabel = ({ value, validCepCallback, isInvalid, ...props}) => {
    const [isInvalidCep, setInvalidCep] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const onBlur = (e) => {
        const cep = e.target.value
        if (cep.length < 9) { 
            setInvalidCep(true)
            return
        }
        validateCep(cep)
            .then(response => response.data)
            .then(data => {
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
                // setIsNotLoading()
            })
    }

    return (
        <InputWithLabel
            { ...props }
            value={formatCep(value)}
            maxLength={9}
            onBlur={onBlur}
            isInvalid={isInvalid || isInvalidCep}
            errorMessage={errorMessage}
        />
    )
}

export default CepInputWithLabel