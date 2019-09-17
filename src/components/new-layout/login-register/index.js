import React from 'react'
import styled from 'styled-components'
import { FORM_INPUT_IDS } from '../../../util/constants'

import BaseForm from '../../base/new/form'
import BaseInput from '../../base/new/input'
import ActionButton from '../button'

const Container = styled.div`
    display: flex;
    flex-direction: column;
`

const FooterForm = styled(BaseForm)`
    
`
const StyledInput = styled(BaseInput)`
    margin-top: 15px;
    width: 320px;
    :focus {
        border: 1.2px #FFC74A solid;
        margin-top: 15px;
    }
`

const TabsContainer = styled.div`
    box-shadow: 0px 1px 3px #0000001C;
    display: flex;
    border: 1px solid #95989A;
    border-radius: 4px;
`
const Tab = styled.div`
    color: white;
    padding: 10px;
    width: 140px;
    text-align: center;
    font-size: 22px;
    
    ${({isSelected}) => isSelected
    ? `
        background-color: #354B0C;
        border: 2px solid white;
        border-radius: 4px;
    `
    : `
        margin: 2px;
    `}
    &:hover {
        cursor: pointer;
    }
`

const Tabs = ['Login', 'Cadastro']

export default class LoginRegister extends React.Component {
    state = {
        selectedTab: Tabs[0],
    }

    onClickTab = (tab) => {
        this.setState({selectedTab: tab})
    }

    renderLoginForm() {
        return (
            <FooterForm key='login-form' id='login-form' submit={this.props.handleLogin}>
                <StyledInput
                    id={FORM_INPUT_IDS.LOGIN}
                    name={FORM_INPUT_IDS.LOGIN}
                    onChange={this.props.handleChange}
                    value={this.props[FORM_INPUT_IDS.LOGIN]}
                    placeholder='Login'
                />
                <StyledInput
                    id={FORM_INPUT_IDS.SENHA}
                    name={FORM_INPUT_IDS.SENHA}
                    onChange={this.props.handleChange}
                    value={this.props[FORM_INPUT_IDS.SENHA]}
                    placeholder='Senha'
                    type="password"
                />
                <ActionButton type='button' action={this.props.handleLogin} buttonText='Entrar'/>

            </FooterForm>
        )
    }
    renderRegisterForm() {
        return (
            <FooterForm key='register-form' id='register-form' action='/register' method='GET'>
                <StyledInput
                    id={FORM_INPUT_IDS.CEP}
                    name={FORM_INPUT_IDS.CEP}
                    onChange={this.props.handleChange}
                    value={this.props[FORM_INPUT_IDS.CEP]}
                    placeholder='CEP'
                />
                <StyledInput
                    id={FORM_INPUT_IDS.NUMERO}
                    name={FORM_INPUT_IDS.NUMERO}
                    onChange={this.props.handleChange}
                    value={this.props[FORM_INPUT_IDS.NUMERO]}
                    placeholder='Número'
                    type="number"
                />
                <ActionButton type='submit' buttonText ='Registrar'/>
            </FooterForm>
        )
    }

    renderSelectedForm() {
        switch(this.state.selectedTab){
            case Tabs[1]:
                return this.renderRegisterForm()
            case Tabs[0]:
            default:
                return this.renderLoginForm()
        }
    }

    render() {
        return (
            <Container>
                <TabsContainer>
                    {Tabs.map((tab, index) => (
                        <Tab
                            key={tab+index}
                            isSelected={this.state.selectedTab === tab}
                            onClick={() => this.onClickTab(tab)}
                        >
                            {tab}
                        </Tab>
                    ))}
                </TabsContainer>
                {this.renderSelectedForm()}
            </Container>
        )
    }
}