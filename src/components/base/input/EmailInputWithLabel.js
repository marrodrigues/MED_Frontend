import React, { useState } from 'react'

import { InputWithLabel } from '../'
import { validateEmail } from '../../../util/validation'

const EmailInputWithLabel = ({ value, emailExistsCallback = () =>{}, emailNotFoundCallback = () =>{}, isInvalid, ...props }) => {
    const [isInvalidEmail, setInvalidEmail] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const onBlur = e => {
        const email = e.target.value
        validateEmail(email)
            .then(response => response.data)
            .then(data => {
                emailExistsCallback(data)
            })
            .catch(error => {
                if (error.response.status === 404) {
                    emailNotFoundCallback()
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
            isInvalid={isInvalid || isInvalidEmail}
            errorMessage={errorMessage}
        />
    )
}

export default EmailInputWithLabel