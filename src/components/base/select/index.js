import React from 'react'
import styled from 'styled-components'

const BaseSelect = styled.select`
    font-size: 18px;
    width: 100%;
    max-width: 550px;
    background: ${props => props.disabled ? '#EBEAE4' : 'white'};
    border-radius: 10px;
    margin: 2px 0;
`

export default class extends React.Component {
    render () {
        return (
            <BaseSelect {...this.props}>
                {/* <option value="" disabled selected>{this.props.placeholderMessage}</option> */}
                {this.props.options.map((option, index) => 
                    <option key={`${option}-${index}`} value={option}>{option.toUpperCase()}</option> 
                )}
            </BaseSelect>
        )
    }
}