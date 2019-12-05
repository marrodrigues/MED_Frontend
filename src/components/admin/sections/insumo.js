import React, { useState, useEffect } from 'react'
import { Container, SectionTitle, TabsAndFilter, TabsContainer, Tab } from './baseSection'
import { ADMIN_TABS, SUPPLY_FIELDS } from '../../../util/constants'
import { InputWithLabel } from '../../base'
import InsumoForm from '../../forms/InsumoForm'
import DataTable from './DataTable'

const InsumoSection = ({ supplyList = [], ...props }) => {
    const [selectedTab, setSelectedTab] = useState(ADMIN_TABS[1])
    const [selectedSupply, setSelectedSupply] = useState({})
    useEffect(() => {
        setSelectedTab(ADMIN_TABS[1])
    }, [selectedSupply])
    const [filter, setFilter] = useState('')
    const [filterValues, setFilterValues] = useState(['', '', ''])
    const filterCallback = supply => {
        console.log(filterValues)
        if (filterValues.every(filter => filter === '')) return true
        return (
        (filterValues[0] ? supply.descricao.toLowerCase().includes(filterValues[0].toLowerCase()) : true)
            && (filterValues[1] ? `${supply.qtd_unid}`.toLowerCase().includes(filterValues[1].toLowerCase()) : true)
            && (filterValues[2] ? supply.unidade.toLowerCase().includes(filterValues[2].toLowerCase()) : true)
    )}
    const updateFilterValues = (e, index) => {
        filterValues[index] = e.target.value
        setFilterValues(filterValues.slice())
        console.log(filterValues)
    }
    const mapCallback = supply => (
        <tr key={supply.descricao} onClick={() => { setSelectedSupply(supply) }}>
            {SUPPLY_FIELDS.map(field => <td key={`${field.name}-${supply.descricao}`}>{supply[field.name]}</td>)}
        </tr>        
    )

    const renderContent = () => {
        switch (selectedTab) {
            case ADMIN_TABS[0]:
                return (
                <DataTable
                    data={supplyList}
                    filter={filter}
                    filterCallback={filterCallback}
                    mapCallback={mapCallback}
                    fields={SUPPLY_FIELDS}
                    showFilters
                    updateFilterValues={updateFilterValues}
                    filterValues={filterValues}
                />)
            case ADMIN_TABS[1]:
                return <InsumoForm selectedSupply={selectedSupply}/>
            default:
                return null
        }
    }
    return (
        <Container>
            <SectionTitle>Insumos</SectionTitle>
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
            </TabsAndFilter>
            {renderContent()}
        </Container>
    )
}

export default InsumoSection