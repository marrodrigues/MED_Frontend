import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import { Container, SectionTitle, TabsAndFilter, TabsContainer, Tab } from './baseSection'
import { InputWithLabel } from '../../base'
import DataTable from './DataTable'
import ClienteForm from '../../forms/ClienteForm'
import { CLIENTE_DEFAULT_VALUE } from '../../../util/constants'

const StyledInputWithLabel = styled(InputWithLabel)`
    
`

const tabs = ['Lista', 'Formulário']


const ClienteSection = ({ clientList = [] }) => {
    const [selectedClient, setSelectedClient] = useState(CLIENTE_DEFAULT_VALUE)
    useEffect(() => {
        setSelectedTab(tabs[1])
    }, [selectedClient])
    const [selectedTab, setSelectedTab] = useState(tabs[0])
    const [filter, setFilter] = useState('')
    
    const filterCallback = client => (
        client.pessoa.nome.includes(filter)
        || client.pessoa.email.includes(filter)
        || client.pessoa.cpf.includes(filter)
    )
    const mapCallback = client => (
        <tr key={client.pessoa.cpf} onClick={() => { setSelectedClient(client) }}>
            <td>{client.pessoa.nome}</td>
            <td>{client.pessoa.email}</td>
            <td>{client.pessoa.cpf}</td>
        </tr>        
    )
    
    const renderContent = () => {
        switch (selectedTab) {
            case tabs[0]:
                return <DataTable
                    data={clientList}
                    filter={filter}
                    filterCallback={filterCallback}
                    mapCallback={mapCallback}
                />
            case tabs[1]:
                return <ClienteForm selectedClient={selectedClient} />
            default:
                return null
        }
    }
    return (
        <Container>
            <SectionTitle>Clientes</SectionTitle>
            <TabsAndFilter>
                <TabsContainer>
                    {tabs.map(tab => 
                        <Tab 
                            isSelected={selectedTab === tab} 
                            key={tab}
                            onClick={() => setSelectedTab(tab)}
                        >
                            {tab}
                        </Tab>
                    )}
                </TabsContainer>
                {selectedTab === tabs[0] &&
                <StyledInputWithLabel
                    label='Filtrar'
                    value={filter}
                    onChange={setFilter}
                />}
            </TabsAndFilter>
            {renderContent()}
        </Container>
    )
}

export default ClienteSection