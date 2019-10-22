import React from 'react'
import styled from 'styled-components'
import FormTitle from './FormTitle'

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    max-width: 700px;
`

const BaseForm = ({ title, children, ...props}) => (
    <StyledForm {...props} >
        {title && <FormTitle title={title} />}
        {children}
    </StyledForm>
)

export default BaseForm