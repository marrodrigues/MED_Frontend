import React from 'react'
import styled from 'styled-components'

const BaseForm = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 90vh;
`

export default class extends React.Component {
    render () {
        return (
            <BaseForm {...this.props} />
        )
    }
}