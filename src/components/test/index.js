import React, { useState } from 'react'
import styled from 'styled-components'
import { CepInputWithLabel } from '../base'

const Container = styled.div`
    display: flex;
    flex-direction: column;
`


const TestComponent = () => {
    const [cep, setCep] = useState('')
    const [errors, setErrors] = useState({})
    return (
        <Container>
            <h1>TestComponent</h1>
            <CepInputWithLabel 
                label='CEP'
                value={cep}
                onChange={setCep}
                isInvalid={errors.cep}
                labelColor='white'
            />
        </Container>
    )
}

export default TestComponent