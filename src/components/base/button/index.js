import React from 'react'
import styled from 'styled-components'

const BaseButton = styled.button`
    font-size: 14px;
    // font-weight: bold;
    color: white;
    max-width: 300px;
    border: 2px solid white;
    border-radius: 20px;
    margin: 5rem 0 0;
    padding: 1rem 2rem;
    background: transparent;
`

export default class extends React.Component {
    render () {
        return (
            <BaseButton {...this.props}/>
        )
    }
}