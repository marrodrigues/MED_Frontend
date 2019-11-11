import React, { useState, useEffect } from 'react'

import { Container, SectionTitle, TabsAndFilter, TabsContainer, Tab } from './baseSection'
import DataTable from './DataTable'
import ClienteForm from '../../forms/ClienteForm'
import { PESSOA_DEFAULT_VALUE, CLIENT_FIELDS } from '../../../util/constants'
import RegisterForm from "../../forms/RegisterForm";

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
    // const fields = [ 'nome', 'email', 'cpf', 'login' ]
    const mapCallback = client => (
        <tr key={client.pessoa.cpf} onClick={() => { setSelectedClient(client) }}>
            {CLIENT_FIELDS.map(field => <td key={`${field.name}-${client.pessoa.cpf}`}>{client.pessoa[field.name]}</td>)}
        </tr>        
    )
    
    const renderContent = () => {
        switch (selectedTab) {
            case tabs[0]:
                return(
                    <DataTable  
                        data={clientList}
                        fields={CLIENT_FIELDS}
                        filter={filter}
                        filterCallback={filterCallback}
                        mapCallback={mapCallback}
                        showFilters
                        updateFilterValues={updateFilterValues}
                        filterValues={filterValues}
                    />
                )
            case tabs[1]:
                return selectedClient.id
                    ? <ClienteForm selectedClient={selectedClient} />
                    : <RegisterForm initialValues={{}}/>
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
            </TabsAndFilter>
            {renderContent()}
        </Container>
    )
}

export default ClienteSection