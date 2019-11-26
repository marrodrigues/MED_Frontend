import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import { Container, SectionTitle, TabsAndFilter, TabsContainer, Tab } from './baseSection'
import { InputWithLabel, BaseForm } from '../../base'
import DataTable from './DataTable'
import { FuncionarioForm } from '../../forms/'
import { PESSOA_DEFAULT_VALUE, ADMIN_TABS, EMPLOYEE_FIELDS } from '../../../util/constants'

const FuncionarioSection = ({ employeeList = [], ...props }) => {
    const [selectedEmployee, setSelectedEmployee] = useState(PESSOA_DEFAULT_VALUE)
    useEffect(() => {
        setSelectedTab(ADMIN_TABS[1])
    }, [selectedEmployee])
    const [selectedTab, setSelectedTab] = useState(ADMIN_TABS[1])
    const [filter, setFilter] = useState('')

    const filterCallback = employee => (
        employee.pessoa.nome.includes(filter)
        || employee.pessoa.email.includes(filter)
        || employee.pessoa.cpf.includes(filter)
        || employee.pessoa.login.includes(filter)
    )

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