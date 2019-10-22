import React from 'react'

import { InputWithLabel } from '../'
import { formatCep } from '../../../util/string'
import { validateCep, isLocationValid } from '../../../util/validation'

const CepInputWithLabel = ({ value, validCepCallback, ...props}) => {
    const onBlur = (e) => {
        const cep = e.target.value
        validateCep(cep)
            .then(response => response.data)
            .then(data => {
                if (data.erro || !isLocationValid(data)) {
                    // setErrors({...errors, CEP: true})
                } else {
                    const { bairro, localidade: cidade, logradouro, uf } = data
                    // setBairro(bairro)
                    // setCidade(cidade)
                    // setLogradouro(logradouro)
                    // setUf(uf)
                    // setErrors({...errors, CEP: false})
                }
            })
            .catch(error => {
                console.log(error);
                // setErrors({...errors, CEP: true})
            })
            .finally(() => {
                // setIsNotLoading()
            })
    }

    return (
        <InputWithLabel
            value={formatCep(value)}
            maxLength={9}
            // onBlur={onBlur}
            { ...props }
        />
    )
}

export default CepInputWithLabel