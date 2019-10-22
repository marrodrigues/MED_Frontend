import React from 'react'
import styled from 'styled-components'

const Title = styled.h1`
    font-size: 29px;
    font-family: Raspoutine;
    color: #425A15;
`
const FormTitle = ({ title }) => <Title>{title}</Title>

export default FormTitle