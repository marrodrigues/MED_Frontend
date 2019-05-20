import React from 'react'
import styled from 'styled-components'

const BaseForm = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-height: fit-content;
    height: 90vh;
    padding: 2.5vh 2.5vw;
    background: darkgray;
`

export default class extends React.Component {
    render () {
        return (
            <BaseForm {...this.props} />
        )
    }
}