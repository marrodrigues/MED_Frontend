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
    const filterCallback = supply => (
        supply.descricao.includes(filter)
        || supply.unidade.includes(filter)
        || supply.qtd_unid.includes(filter)
    )
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