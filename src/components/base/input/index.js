import React from 'react'
import styled from 'styled-components'

const BaseInput = styled.input`
    font-size: 20px;
    width: 100%;
    max-width: 550px;
    border: 2px solid ${props => props.isValid || props.noValidation ? 'gray' : 'red'};
    border-radius: 10px;
    margin: 2px 0;
`

export default class extends React.Component {
    render () {
        return (
            <BaseInput {...this.props}/>
        )
    }
}