import React, { useState, useEffect } from 'react'
import { Container, SectionTitle, TabsAndFilter, TabsContainer, Tab } from './baseSection'
import { ADMIN_TABS, BUNDLE_FIELDS } from '../../../util/constants'
import LoteForm from '../../forms/LoteForm'
import DataTable from './DataTable'
import {formatMoney} from "../../../util/string";

const LoteSection = ({ bundleList = [], supplyList = [], productList = [], ...props }) => {
    const [selectedTab, setSelectedTab] = useState(ADMIN_TABS[1])
    const [selectedBundle, setSelectedBundle] = useState({})
    useEffect(() => {
        setSelectedTab(ADMIN_TABS[1])
    }, [selectedBundle])
    const [filter, setFilter] = useState('')
    const [filterValues, setFilterValues] = useState(['', '', '', '', ''])
    const filterCallback = bundle => {
        console.log(filterValues)
        if (filterValues.every(filter => filter === '')) return true
        const insumoProduto = bundle.produto ? bundle.produto.nome : bundle.insumo.descricao
        return (
        (filterValues[0] ? bundle.lote.toLowerCase().includes(filterValues[0].toLowerCase()) : true)
        && (filterValues[1] ? `${bundle.qtd}`.toLowerCase().includes(filterValues[1].toLowerCase()) : true)
        && (filterValues[2] ? `${bundle.validade}`.toLowerCase().includes(filterValues[2].toLowerCase()) : true)
        && (filterValues[3] ? insumoProduto.toLowerCase().includes(filterValues[3].toLowerCase()) : true)
        && (filterValues[4] ? `${bundle.valor_unitario}`.toLowerCase().includes(filterValues[4].toLowerCase()) : true)
        )}
    const updateFilterValues = (e, index) => {
        filterValues[index] = e.target.value
        setFilterValues(filterValues.slice())
        console.log(filterValues)
    }

    const mapCallback = bundle => (
        <tr key={bundle.lote} onClick={() => { setSelectedBundle(bundle) }}>
            {BUNDLE_FIELDS.map(field =>
                <td key={`${field.name}-${bundle.lote}`}>
                    {field.name === 'insumoproduto'
                        ?  bundle.produto ? bundle.produto.nome : bundle.insumo.descricao
                        : field.name === 'valor_unitario'
                            ? 'R$ ' + formatMoney(bundle[field.name])
                            :bundle[field.name]}
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
                    showFilters
                    updateFilterValues={updateFilterValues}
                    filterValues={filterValues}
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