import React from 'react'
import styled from 'styled-components'

const BaseLabel = styled.label`
    font-size: 20px;
`

export default class extends React.Component {
    render () {
        return (
            <BaseLabel {...this.props}/>
        )
    }
}