import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import { Container, SectionTitle, TabsAndFilter, TabsContainer, Tab } from './baseSection'
import { InputWithLabel, BaseForm } from '../../base'
import DataTable from './DataTable'
import { FuncionarioForm } from '../../forms/'
import {PESSOA_DEFAULT_VALUE, ADMIN_TABS, EMPLOYEE_FIELDS, CLIENT_FIELDS} from '../../../util/constants'

const FuncionarioSection = ({ employeeList = [], ...props }) => {
    const [selectedEmployee, setSelectedEmployee] = useState(PESSOA_DEFAULT_VALUE)
    useEffect(() => {
        setSelectedTab(ADMIN_TABS[1])
    }, [selectedEmployee])
    const [selectedTab, setSelectedTab] = useState(ADMIN_TABS[1])
    const [filter, setFilter] = useState('')
    const [filterValues, setFilterValues] = useState(['', '', '', '', ''])

    const filterCallback = funcionario => {
        console.log(filterValues)
        if (filterValues.every(filter => filter === '')) return true
        return (
        (filterValues[0] ? funcionario.pessoa.nome.toLowerCase().includes(filterValues[0].toLowerCase()) : true)
        && (filterValues[1] ? funcionario.pessoa.email.toLowerCase().includes(filterValues[1].toLowerCase()) : true)
        && (filterValues[2] ? funcionario.pessoa.cpf.includes(filterValues[2]) : true)
        && (filterValues[3] ? funcionario.pessoa.login.toLowerCase().includes(filterValues[3].toLowerCase()) : true)
        && (filterValues[4] ? funcionario.cargo.includes.toLowerCase()(filterValues[4].toLowerCase()) : true)
    )}
    const updateFilterValues = (e, index) => {
        filterValues[index] = e.target.value
        setFilterValues(filterValues.slice())
        console.log(filterValues)
    }

    const mapCallback = employee => (
        <tr key={employee.pessoa.cpf} onClick={() => { setSelectedEmployee(employee) }}>
            {EMPLOYEE_FIELDS.map(field => <td key={`${field.displayName}-${employee.pessoa.cpf}`}>{employee.pessoa[field.name] || employee[field.name]}</td>)}
            {/* <td>{client.pessoa.nome}</td>
            <td>{client.pessoa.email}</td>
            <td>{client.pessoa.cpf}</td> */}
        </tr>        
    )

    const renderContent = () => {
        switch (selectedTab) {
            case ADMIN_TABS[0]:
                return (
                    <DataTable
                        data={employeeList}
                        filter={filter}
                        filterCallback={filterCallback}
                        mapCallback={mapCallback}
                        fields={EMPLOYEE_FIELDS}
                        showFilters
                        updateFilterValues={updateFilterValues}
                        filterValues={filterValues}
                    />
                )
            case ADMIN_TABS[1]:
                return <FuncionarioForm selectedEmployee={selectedEmployee} />
                    
            default:
                return null
        }
    }
    return (
        <Container>
            <SectionTitle>Funcionários</SectionTitle>
            <TabsAndFilter>
                <TabsContainer>
                    {ADMIN_TABS.map(tab =>
                        <Tab
                            isSelected={selectedTab === tab}
                            key={tab}
                            onClick={() => setSelectedTab(tab)}
                        >
                            {tab}
                        </Tab>
                    )}
                </TabsContainer>
                {/* {selectedTab === ADMIN_TABS[0] &&
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

export default FuncionarioSection