import React from 'react'
import styled from 'styled-components'

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
`

const BaseForm = (props) => (
    <StyledForm
        {...props}
    />
)

export default BaseForm