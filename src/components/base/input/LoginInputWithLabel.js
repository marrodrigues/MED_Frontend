import React, { useState } from 'react'

import { InputWithLabel } from '../'
import { validateLogin } from '../../../util/validation'

const LoginInputWithLabel = ({ value, loginExistsCallback = () =>{}, loginNotFoundCallback = () =>{}, isInvalid, ...props }) => {
    const [isInvalidLogin, setInvalidLogin] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const onBlur = e => {
        const login = e.target.value
        validateLogin(login)
            .then(response => response.data)
            .then(data => {
                loginExistsCallback(data)
            })
            .catch(error => {
                if (error.response.status === 404) {
                    loginNotFoundCallback()
                } else {
                    console.log(JSON.stringify(error))
                }
            })
    }

    return (
        <InputWithLabel
            {...props}
            value={value}
            onBlur={onBlur}
            isInvalid={isInvalid || isInvalidLogin}
            errorMessage={errorMessage}
        />
    )
}

export default LoginInputWithLabel