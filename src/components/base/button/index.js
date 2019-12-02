import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import Spinner from 'react-spinkit'


const BaseButton = styled.button`
margin-top: 1vh;
width: 120px;
font: Bold 14px Raspoutine;
border-radius: 5px;
padding: 5px 10px;
color: white;
text-align: center;
background: #354B0C;
&:hover {
    cursor: pointer;
}
`
export default BaseButton


const ButtonOrSpinnerWrapper = ({ label, loading, disabled }) => (
    <div style={{marginLeft: 'auto'}}>
        {loading
        ? <Spinner color='yellow' name='circle' />
        : <BaseButton type='submit' disabled={disabled}>{label}</BaseButton>}
    </div>
)

const mapStateToProps = state => {
    const { app } = state
    const { loading } = app
    return { loading }
}

export const ButtonOrSpinner = connect(mapStateToProps)(ButtonOrSpinnerWrapper)