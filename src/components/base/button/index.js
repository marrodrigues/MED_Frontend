import React from 'react'
import styled from 'styled-components'

const BaseButton = styled.button`
    font-size: 14px;
    font-weight: bold;
    color: white;
    max-width: 300px;
    border: 2px solid white;
    border-radius: 20px;
    margin: 2rem 2rem 0;
    padding: 1rem 2rem;
    background: transparent;
    opacity: ${props => props.disabled ? 0.3 : 1};
    transition: opacity ease 0.5s;
`

export default class extends React.Component {
    render () {
        return (
            <BaseButton {...this.props}/>
        )
    }
}