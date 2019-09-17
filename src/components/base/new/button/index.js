import React from 'react'
import styled from 'styled-components'

const BaseButton = styled.button`
    background-color: #425A15;
    color: white;
    text-transform: uppercase;
    width: 145px;
    height: 45px;
    border-radius: 20px;
    border: none;
    font: Medium 16px/35px Helvetica Neue;
`

export default class extends React.Component {
    render () {
        return (
            <BaseButton {...this.props}/>
        )
    }
}