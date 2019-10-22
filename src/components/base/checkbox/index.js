import React from 'react'
import styled from 'styled-components'
import BaseInput from '../input'
import BaseLabel from '../label'

const Container = styled.div`
    display: flex;
`


const BaseCheckbox = styled.input`
    font-size: 18px;
    width: 100%;
    max-width: 550px;
    border: 2px solid ${props => props.isValid || props.noValidation ? 'gray' : 'red'};
    border-radius: 10px;
    margin: 2px 0;
`

export default class extends React.Component {
    state = {
        isChecked: false
    }
    render () {
        return (
            <Container>
                <BaseCheckbox onClick={() => {this.setState({ isChecked: !this.state.isChecked })}} type='checkbox' {...this.props}/>
                <BaseLabel htmlFor={this.props.name}>{this.props.name}</BaseLabel>
                <BaseInput
                    id={this.props.name}
                    name={this.props.name}
                    noValidation
                    onChange={this.handleChangeInput}
                    value={this.props.name}
                    type='number'
                    min={0}
                    step={0.01}
                    disabled={this.state.isLocked}
                />
            </Container>
        )
    }
}