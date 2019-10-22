import React from 'react'
import styled from 'styled-components'

const StyledInput = styled.input`
    padding: 5px;
    border: 1px #236C4A solid;
    border-radius: 5px;
    width: ${ ({width}) => width || '300px'};
    font-size: 16px;
    margin: 0.2px 0;

    :focus {
        border: 1.2px #FFC74A solid;
        margin: 0;
    }
`

const BaseInput = (props) => (
    <StyledInput
        {...props} 
    />
)

export default BaseInput;