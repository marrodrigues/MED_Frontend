import React, { useState } from 'react'
import styled from 'styled-components'

import { FOOTER_TABS } from '../../util/constants'

import { LoginForm, PreRegisterForm } from '../forms/'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }
`
const TabsContainer = styled.div`
    box-shadow: 0px 1px 3px #0000001C;
    display: flex;
    border-radius: 4px;
`
const Tab = styled.div`
    color: white;
    padding: 10px;
    width: 140px;
    text-align: center;
    font-size: 22px;
    font-family: Raspoutine;
    
    ${({isSelected}) => isSelected
    ? `
        background-color: #354B0C;
        border: 2px solid white;
        border-radius: 4px;
    `
    : `
        // margin: 2px;
        background-color: #354B0C;
        border: 2px solid gray;
        border-radius: 4px;
    `}
    &:hover {
        cursor: pointer;
    }
`

const LoginRegister = () => {
    const [selectedTab, setSelectedTab] = useState(FOOTER_TABS[0])
    const onClickTab = (tab) => {
        setSelectedTab(tab)
    }
    const renderLoginForm = () => (
        <LoginForm />
    )
    const renderRegisterForm = () => (
        <PreRegisterForm />
    )

    const renderSelectedForm = () => {
        switch(selectedTab){
            case FOOTER_TABS[1]:
                return renderRegisterForm()
            case FOOTER_TABS[0]:
            default:
                return renderLoginForm()
        }
    }

    return (
        <Container>
            <TabsContainer>
                    {FOOTER_TABS.map((tab, index) => (
                        <Tab
                            key={tab+index}
                            isSelected={selectedTab === tab}
                            onClick={() => onClickTab(tab)}
                        >
                            {tab}
                        </Tab>
                    ))}
                </TabsContainer>
                {renderSelectedForm()}
        </Container>
    )
}

export default LoginRegister