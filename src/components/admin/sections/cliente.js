import React from 'react'
import styled from 'styled-components'

import EditModal from './editModal'

// const Container = styled.section`
//     display: flex;
//     flex-direction: column;

// `

export default class ClientSection extends React.Component {
    state = {
        selectedClient: {},
        openModal: false
    }
    selectClient(selectedClient) {
        // debugger
        console.log(selectedClient)
        this.setState({selectedClient, openModal: true})
    }
    closeModal = () => {
        this.setState({openModal: false})
    }
    renderClientInfo() {
        const { selectedClient } = this.state
        console.log(selectedClient)
        let clientInfo = []
        // debugger
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
                <ul className='name-list'>
                    { clientList.map(client => <li key={client.id} onClick={() => this.selectClient(client)}>{client.pessoa.nome}</li>) }
                </ul>
                <ul className='attr-list'>
                    {this.state.selectedClient.id && this.renderClientInfo() }
                </ul>
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