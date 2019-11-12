import React from 'react'
import styled from 'styled-components'
import { BaseLabel } from "../base";

const StyledSelect = styled.select`
    height: 32px;
`

const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1vh 0 0;
    label {
        padding-bottom: 0.5vh;
    }
`


const Select = ({ objectList, fieldForValue, fieldForLabel, onChangeValue = () => {}, name, label, ...props }) => {
    return (
        <Container>
            <BaseLabel color='#236C4A'>{label}</BaseLabel>
            <StyledSelect name={name} onChange={onChangeValue} {...props}>
                {
                    objectList.map(object =>
                        <option key={object[fieldForValue]} value={object[fieldForValue]}>
                            {object[fieldForLabel]}
                        </option>
                    )
                }
            </StyledSelect>
        </Container>
    )
}

export default Select