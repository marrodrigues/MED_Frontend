import React from 'react'
import styled from 'styled-components'

const RadioContainer = styled.div`
    font-size: 14px;
    text-transform: uppercase;
    color: white;
    padding: 1vh 2vw;
`
const BaseRadioInput = styled.input`
`

export default class extends React.Component {
    render () {
        return (
            <RadioContainer>
                <BaseRadioInput type='radio' {...this.props}/>
                {this.props.value}
            </RadioContainer>
        )
    }
}