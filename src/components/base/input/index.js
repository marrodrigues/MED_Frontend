import React from 'react'
import styled from 'styled-components'

const BaseInput = styled.input`
    font-size: 20px;
    max-width: 300px;
    border: 2px solid ${props => props.isValid || props.noValidation ? 'green' : 'red'};
`

export default class extends React.Component {
    render () {
        return (
            <BaseInput {...this.props}/>
        )
    }
}