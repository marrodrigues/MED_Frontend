import React, { useState, useEffect } from 'react'
import { Container, SectionTitle, TabsAndFilter, TabsContainer, Tab } from './baseSection'
import { ADMIN_TABS } from '../../../util/constants'
import { InputWithLabel } from '../../base'
import LoteForm from '../../forms/LoteForm'
import DataTable from './DataTable'

const LoteSection = ({ bundleList = [], supplyList = [], productList = [], ...props }) => {
    const [selectedTab, setSelectedTab] = useState(ADMIN_TABS[1])
    const [selectedBundle, setSelectedBundle] = useState({})
    useEffect(() => {
        setSelectedTab(ADMIN_TABS[1])
    }, [selectedBundle])
    const [filter, setFilter] = useState('')
    const filterCallback = supply => (
        supply.lote.includes(filter)
        || supply.qtd.includes(filter)
    )
    const fields = [ 'lote', 'qtd', 'validade']
    const mapCallback = bundle => (
        <tr key={bundle.lote} onClick={() => { setSelectedBundle(bundle) }}>
            {fields.map(field => <td key={`${field}-${bundle.lote}`}>{bundle[field]}</td>)}
        </tr>        
    )

    const renderContent = () => {
        switch (selectedTab) {
            case ADMIN_TABS[0]:
                return (
                <DataTable
                    data={bundleList}
                    filter={filter}
                    filterCallback={filterCallback}
                    mapCallback={mapCallback}
                    fields={fields}
                />)
            case ADMIN_TABS[1]:
                return <LoteForm selectedBundle={selectedBundle} supplyList={supplyList} productList={productList} />
            default:
                return null
        }
    }
    return (
        <Container>
            <SectionTitle>Lotes</SectionTitle>
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

export default LoteSection