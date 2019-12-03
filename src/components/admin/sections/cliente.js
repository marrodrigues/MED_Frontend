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
        (filterValues[0] ? client.pessoa.nome.toLowerCase().includes(filterValues[0].toLowerCase()) : true)
        && (filterValues[1] ? client.pessoa.email.toLowerCase().includes(filterValues[1].toLowerCase()) : true)
        && (filterValues[2] ? client.pessoa.cpf.includes(filterValues[2]) : true)
        && (filterValues[3] ? client.pessoa.login.toLowerCase().includes(filterValues[3].toLowerCase()) : true)
    )}
    const updateFilterValues = (e, index) => {
        filterValues[index] = e.target.value
        setFilterValues(filterValues.slice())
        console.log(filterValues)
    }
    // const fields = [ 'nome', 'email', 'cpf', 'login' ]
    const mapCallback = (client, index) => (
        <tr key={`${client.pessoa.cpf}-${index}`} onClick={() => { setSelectedClient(client) }}>
            {CLIENT_FIELDS.map(field => <td key={`${field.name}-${client.pessoa.cpf}`}>{client.pessoa[field.name]}</td>)}
        </tr>        
    )
    const clientFoundCallback = data => {
        const fullClient = clientList.find(client => client.pessoaId === data.id)
        console.log(fullClient)
        if (fullClient) {
            setSelectedClient(fullClient)
        }
    }
    const clearClient = e => {
        e.preventDefault()
        e.stopPropagation()
        setSelectedClient(PESSOA_DEFAULT_VALUE)
    }
    
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
                    ? <ClienteForm selectedClient={selectedClient} clearClient={clearClient} />
                    : <RegisterForm initialValues={{}} clientFoundCallback={clientFoundCallback} />
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