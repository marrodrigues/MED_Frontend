import React from 'react'
import styled from 'styled-components'

const BaseFormTitle = styled.h2`
    font-size: 24px;
    font-weight: bold;
    color: white;
    text-align: center;
    text-transform: uppercase;
    padding-bottom: 30px;
`

export default class extends React.Component {
    render () {
        const { title } = this.props
        return (
            <BaseFormTitle>{title}</BaseFormTitle>
        )
    }
}