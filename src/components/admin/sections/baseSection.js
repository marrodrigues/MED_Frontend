// import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    flex-direction: column;
`

const SectionTitle = styled.h1`
    font-size: 29px;
    font-family: Raspoutine;
    color: #425A15;
`

const TabsAndFilter = styled.div`
    display: flex;
    justify-content: space-between;
    padding-bottom: 2vh;
`
const TabsContainer = styled.div`
    box-shadow: 0px 1px 3px #0000001C;
    display: flex;
    border-radius: 4px;
`

const Tab = styled.div`
    color: #425A15;
    padding: 10px;
    width: 140px;
    text-align: center;
    font-size: 22px;
    font-family: Raspoutine;
    background-color: white;
    border-radius: 4px;
    
    ${({isSelected}) => isSelected
    ? `
        border: 2px solid #425A15;
    `
    : `
        border: 2px solid #C7C7C7;
    `}
    &:hover {
        cursor: pointer;
    }
`

export { Container, SectionTitle, TabsAndFilter, TabsContainer, Tab }