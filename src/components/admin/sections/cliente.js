import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import { Container, SectionTitle, TabsAndFilter, TabsContainer, Tab } from './baseSection'
import { InputWithLabel } from '../../base'
import DataTable from './DataTable'
import ClienteForm from '../../forms/ClienteForm'
import { PESSOA_DEFAULT_VALUE } from '../../../util/constants'

const StyledInputWithLabel = styled(InputWithLabel)`
    
`

const tabs = ['Lista', 'Formulário']


const ClienteSection = ({ clientList = [] }) => {
    const [selectedClient, setSelectedClient] = useState(PESSOA_DEFAULT_VALUE)
    useEffect(() => {
        setSelectedTab(tabs[1])
    }, [selectedClient])
    const [selectedTab, setSelectedTab] = useState(tabs[0])
    const [filter, setFilter] = useState('')
    const [filterValues, setFilterValues] = useState(['', '', '', ''])
    const filterCallback = client => {
        console.log(filterValues)
        if (filterValues.every(filter => filter === '')) return true
        return (
        (filterValues[0] ? client.pessoa.nome.includes(filterValues[0]) : true)
        && (filterValues[1] ? client.pessoa.email.includes(filterValues[1]) : true)
        && (filterValues[2] ? client.pessoa.cpf.includes(filterValues[2]) : true)
        && (filterValues[3] ? client.pessoa.login.includes(filterValues[3]) : true)
    )}
    const updateFilterValues = (e, index) => {
        filterValues[index] = e.target.value
        setFilterValues(filterValues.slice())
        console.log(filterValues)
    }
    const fields = [ 'nome', 'email', 'cpf', 'login' ]
    const mapCallback = client => (
        <tr key={client.pessoa.cpf} onClick={() => { setSelectedClient(client) }}>
            {fields.map(field => <td key={`${field}-${client.pessoa.cpf}`}>{client.pessoa[field]}</td>)}
        </tr>        
    )
    
    const renderContent = () => {
        switch (selectedTab) {
            case tabs[0]:
                return(
                    <DataTable
                        data={clientList}
                        filter={filter}
                        filterCallback={filterCallback}
                        mapCallback={mapCallback}
                        showFilters
                        updateFilterValues={updateFilterValues}
                        filterValues={filterValues}
                    />
                )
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
                {/* {selectedTab === tabs[0] &&
                <StyledInputWithLabel
                    label='Filtrar'
                    value={filter}
                    onChange={setFilter}
                />} */}
            </TabsAndFilter>
            {renderContent()}
        </Container>
    )
}

export default ClienteSection