import React from 'react'
import styled from 'styled-components'

import EditModal from '../editModal'
import RegisterForm from '../../register-form'

// const Container = styled.section`
//     display: flex;
//     flex-direction: column;

// `
const Tabs = styled.div`
    display: flex;
    width: 100%;
    margin: 2vh 0;
`
const Tab = styled.span`
    font-size: 18px;
    padding: 1vh 2vw;
    border: 1px solid gray;
    &:not(:first-child) {
        border-left: none;
    }
    :hover {
        cursor: pointer;
    }
    ${props => props.isSelected
    ? `
        background: rgba(255, 0, 0, 0.3);
        color: black;
    `
    : ''
    };
`
const FormContainer = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
`
const tabs = ['Formulário', 'Lista']

export default class ClientSection extends React.Component {
    state = {
        selectedClient: {},
        openModal: false,
        selectedTab: tabs[0],
    }
    selectClient(selectedClient) {
        // // debugger
        console.log(selectedClient)
        this.setState({selectedClient, openModal: true})
    }
    selectTab(tab) {
        console.log(tab)
        this.setState({selectedTab: tab})
    }
    closeModal = () => {
        this.setState({openModal: false})
    }
    renderClientInfo() {
        const { selectedClient } = this.state
        console.log(selectedClient)
        let clientInfo = []
        // // debugger
        for(let prop of Object.keys(selectedClient)) {
            if (selectedClient[prop]) {
                clientInfo.push((<li key={`${prop}-${selectedClient[prop]}`}>{`${prop}: ${selectedClient[prop]}`}</li>))
            }
        } 
        for(let prop of Object.keys(selectedClient.pessoa)) {
            if (selectedClient.pessoa[prop]) {
                clientInfo.push((<li key={`pessoa-${prop}-${selectedClient[prop]}`}>{`${prop}:${selectedClient.pessoa[prop]}`}</li>))
            }
        }
        console.log(clientInfo, selectedClient)
        return clientInfo
    }
    
    render() {
        const { clientList } = this.props || []
        console.log(clientList)
        return (
            <React.Fragment>
                <h1>Clientes</h1>
                <Tabs>
                    {tabs.map(tab => 
                        <Tab 
                            isSelected={this.state.selectedTab === tab} 
                            key={tab}
                            onClick={() => this.selectTab(tab)}
                        >
                                {tab}
                        </Tab>
                    )}
                </Tabs>
                {
                    this.state.selectedTab === 'Formulário' && 
                    <FormContainer>
                        <RegisterForm />
                    </FormContainer>
                }
                {
                    this.state.selectedTab === 'Lista' &&
                    <ul className='name-list'>
                        { clientList.map(client => <li key={client.id} onClick={() => this.selectClient(client)}>{client.pessoa.nome}</li>) }
                    </ul>
                }
                {/* <ul className='attr-list'>
                    {this.state.selectedClient.id && this.renderClientInfo() }
                </ul> */}
                <EditModal
                    onRequestClose={this.closeModal}
                    isOpen={this.state.openModal}
                    contentLabel='Edição de cliente'
                    user={this.state.selectedClient}
                />
            </React.Fragment>
        )
    }
}