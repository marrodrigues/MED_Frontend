import React, { useState } from 'react'
import { connect } from 'react-redux'

import { BaseForm, InputWithLabel } from '../base'
import { UserProvider } from '../../providers'
import { setLoggedUser, setLoading, setNotLoading } from '../../actions'
// import { FORM_INPUT_IDS } from '../../util/constants'
import { ButtonOrSpinner } from '../base/button'

const LoginForm = ({ onLoginSucess, setIsLoading, setIsNotLoading }) => {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const errorsInitalState = {login: false, password: false}
    const [errors, setErrors] = useState(errorsInitalState)
    const validateInputs = () => {
        let errors = errorsInitalState
        if (!login) errors.login = true
        if (!password) errors.password = true
        setErrors(errors)
    }
    const handleSubmit = e => {
        setIsLoading()
        e.preventDefault()
        e.stopPropagation()
        validateInputs()
        if (Object.values(errors).some(field => field)) {
            setIsNotLoading()    
            return
        }
        UserProvider.login({login, senha: password})
            .then(response => response.data)
            .then(data =>  {
                onLoginSucess(data)
                setIsNotLoading()
                if (data.role === 'cliente') {
                    window.location.href = '/cliente'
                } else {
                    window.location.href = '/admin'
                }
            })
            .catch(error => {
                console.log(JSON.stringify(error))
            })
    } 
    return (
        <BaseForm key='login-form' id='login-form' onSubmit={handleSubmit}>
            <InputWithLabel 
                label='Login'
                value={login}
                onChange={setLogin}
                isInvalid={errors.login}
                labelColor='white'
            />
            <InputWithLabel 
                label='Senha'
                value={password}
                onChange={setPassword}
                type='password'
                isInvalid={errors.password}
                labelColor='white'
            />
            <ButtonOrSpinner label='Entrar'/>
            
        </BaseForm>
    )
}

const mapDispatchToProps = dispatch => ({
    onLoginSucess: (userData) => {
        dispatch(setLoggedUser(userData));
    },
    setIsLoading: () => {
        dispatch(setLoading())
    },
    setIsNotLoading: () => {
        dispatch(setNotLoading())
    }
});

export default connect(() => ({}), mapDispatchToProps)(LoginForm)