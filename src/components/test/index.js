import React, { useState } from 'react'
import styled from 'styled-components'
import { EmailInputWithLabel, CepInputWithLabel, CpfInputWithLabel, LoginInputWithLabel } from '../base'

const Container = styled.div`
    display: flex;
    flex-direction: column;
`


const TestComponent = () => {
    const [email, setEmail] = useState('')
    const [cep, setCep] = useState('')
    const [cpf, setCpf] = useState('')
    const [login, setLogin] = useState('')

    
    const [errors, setErrors] = useState({})
    return (
        <Container>
            <h1>TestComponent</h1>
            <EmailInputWithLabel 
                value={email}
                onChange={setEmail}
                // isInvalid={errors.email}
            />
            <CepInputWithLabel 
                value={cep}
                onChange={setCep}
                // isInvalid={errors.email}
            />
            <CpfInputWithLabel 
                value={cpf}
                onChange={setCpf}
                // isInvalid={errors.email}
            />
            <LoginInputWithLabel 
                value={login}
                onChange={setLogin}
                // isInvalid={errors.email}
            />
        </Container>
    )
}

export default TestComponent