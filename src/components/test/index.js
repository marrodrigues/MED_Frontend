import React, { useState } from 'react'
import styled from 'styled-components'
import { EmailInputWithLabel } from '../base'

const Container = styled.div`
    display: flex;
    flex-direction: column;
`


const TestComponent = () => {
    const [email, setEmail] = useState('')
    const [errors, setErrors] = useState({})
    return (
        <Container>
            <h1>TestComponent</h1>
            <EmailInputWithLabel 
                label='Email'
                value={email}
                onChange={setEmail}
                isInvalid={errors.email}
                // labelColor='white'
                validCepCallback={()=>{}}
            />
        </Container>
    )
}

export default TestComponent