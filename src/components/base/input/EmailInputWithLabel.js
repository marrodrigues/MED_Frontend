import React, { useState } from 'react'
import { connect } from 'react-redux'
import { setLoading, setNotLoading } from '../../../actions'

import { InputWithLabel } from '../'
import { validateEmail } from '../../../util/validation'

const EmailInputWithLabel = ({ value, emailExistsCallback = () => {}, emailNotFoundCallback = () => {}, isInvalid, setIsLoading, setIsNotLoading, ...props }) => {
    const [isInvalidEmail, setInvalidEmail] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const callbackResult = (invalid, message) => {
        setInvalidEmail(invalid)
        setErrorMessage(message)
    }
    const onBlur = e => {
        setIsLoading()
        const email = e.target.value
        validateEmail(email)
            .then(response => response.data)
            .then(data => {
                const [invalid, message] = emailExistsCallback(data)
                callbackResult(invalid, message)
            })
            .catch(error => {
                if (error.response.status === 404) {
                    const [invalid, message] = emailNotFoundCallback()
                    callbackResult(invalid, message)
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
            label='E-mail'
            value={value}
            onBlur={onBlur}
            isInvalid={isInvalid || isInvalidEmail}
            errorMessage={errorMessage}
            type='email'
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

export default connect(mapStateToProps, mapDispatchToProps)(EmailInputWithLabel)