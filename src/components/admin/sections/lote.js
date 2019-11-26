import React, { useState, useEffect } from 'react'
import { Container, SectionTitle, TabsAndFilter, TabsContainer, Tab } from './baseSection'
import { ADMIN_TABS, BUNDLE_FIELDS } from '../../../util/constants'
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

    const mapCallback = bundle => (
        <tr key={bundle.lote} onClick={() => { setSelectedBundle(bundle) }}>
            {BUNDLE_FIELDS.map(field =>
                <td key={`${field.name}-${bundle.lote}`}>
                    {field.name === 'insumoproduto'
                        ?  bundle.produto ? bundle.produto.nome : bundle.insumo.descricao
                        : bundle[field.name]}
                </td>)}
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
                    fields={BUNDLE_FIELDS}
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