import React from 'react'
import styled from 'styled-components'

const Button = styled.button`
    margin-top: 5px;
    margin-left: auto;
    width: 30%;
    font: Bold 14px Helvetica;
    border: 2px solid yellow;
    border-radius: 5px;
    padding: 5px 10px;
    color: gray;
    text-align: center;
    background: #FFD27C;
    &:hover {
        cursor: pointer;
    }
`

const ActionButton = ({ buttonText, action }) => (
    <Button onClick={action}>{buttonText}</Button>
)

export default ActionButton