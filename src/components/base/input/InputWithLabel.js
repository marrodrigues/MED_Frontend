import React from 'react'
import styled from 'styled-components'

import { BaseInput, BaseLabel } from '../'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1vh 0 0;
    label {
        padding-bottom: 0.5vh;
    }
`

const InputWithLabel = ({ label, value, onChange, type = 'text', isInvalid, labelColor = '#236C4A', errorMessage, ...props }) => {
    return (
        <Container>
            <BaseLabel color={isInvalid ? 'red' : labelColor}>{`${label}${(isInvalid ? ` - Erro: ${errorMessage}` : '')}`}</BaseLabel>
            <BaseInput
                value={value}
                onChange={(e) => { onChange(e.target.value) }}
                type={type}
                isInvalid={isInvalid}
                {...props}
            />
        </Container>
    )
}

export default InputWithLabel