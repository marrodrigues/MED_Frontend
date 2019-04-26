import React from 'react'
import styled from 'styled-components'

const BaseLabel = styled.label`
    font-size: 16px;
    font-weight: bold;
    color: white;
    text-align: center;
`

export default class extends React.Component {
    render () {
        return (
            <BaseLabel {...this.props}/>
        )
    }
}