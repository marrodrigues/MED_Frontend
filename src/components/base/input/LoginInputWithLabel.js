import React, { useState } from 'react'
import { connect } from 'react-redux'
import { setLoading, setNotLoading } from '../../../actions'

import { InputWithLabel } from '../'
import { validateLogin } from '../../../util/validation'

const LoginInputWithLabel = ({ value, loginExistsCallback = () =>{}, loginNotFoundCallback = () =>{}, isInvalid, setIsLoading, setIsNotLoading, ...props }) => {
    const [isInvalidLogin, setInvalidLogin] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const callbackResult = (invalid, message) => {
        setInvalidLogin(invalid)
        setErrorMessage(message)
    }
    const onBlur = e => {
        setIsLoading()
        const login = e.target.value
        validateLogin(login)
            .then(response => response.data)
            .then(data => {
                const [invalid, message] = loginExistsCallback(data)
                callbackResult(invalid, message)
            })
            .catch(error => {
                if (error.response.status === 404) {
                    const [invalid, message] = loginNotFoundCallback()
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
            label='Login'
            value={value}
            onBlur={onBlur}
            isInvalid={isInvalid || isInvalidLogin}
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginInputWithLabel)