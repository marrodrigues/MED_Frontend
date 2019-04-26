import React from 'react'
import styled from 'styled-components'

const BaseButton = styled.button`
    font-size: 14px;
    font-weight: bold;
    max-width: 300px;
    border: 2px solid gray;
    border-radius: 20px;
    margin: 2px 0;
    padding: 5px 10px;
    background: transparent;
`

export default class extends React.Component {
    render () {
        return (
            <BaseButton {...this.props}/>
        )
    }
}