import React, { useState, useEffect } from 'react'
import { Container, SectionTitle, TabsAndFilter, TabsContainer, Tab } from './baseSection'
import { ADMIN_TABS, PRODUCT_FIELDS } from '../../../util/constants'
import ProdutoForm from '../../forms/ProdutoForm'
import DataTable from './DataTable'
import {formatMoney} from "../../../util/string";

const ProdutoSection = ({ productList = [], supplyList = [], ...props }) => {
    const [selectedTab, setSelectedTab] = useState(ADMIN_TABS[1])
    const [selectedProduct, setSelectedProduct] = useState({})
    useEffect(() => {
        setSelectedTab(ADMIN_TABS[1])
    }, [selectedProduct])
    const [filter, setFilter] = useState('')
    const [filterValues, setFilterValues] = useState(['', '', ''])
    const filterCallback = product => {
        console.log(filterValues)
        if (filterValues.every(filter => filter === '')) return true
        return (
        (filterValues[0] ? product.nome.toLowerCase().includes(filterValues[0].toLowerCase()) : true)
        && (filterValues[1] ? product.tamanho.toLowerCase().includes(filterValues[1].toLowerCase()) : true)
        && (filterValues[2] ? `${product.valor}`.toLowerCase().includes(filterValues[2].toLowerCase()) : true)

        )}
    const updateFilterValues = (e, index) => {
        filterValues[index] = e.target.value
        setFilterValues(filterValues.slice())
        console.log(filterValues)
    }
    const mapCallback = (product, i) => (
        <tr key={`${product.nome}-${i}`} onClick={() => { setSelectedProduct(product) }}>
            {PRODUCT_FIELDS.map(field =>
                <td key={`${field.name}-${product.nome}`}>
                    {field.name === 'valor'
                        ? 'R$ ' + formatMoney(product[field.name])
                        : product[field.name]
                    }
                </td>)}
        </tr>        
    )

    const renderContent = () => {
        switch (selectedTab) {
            case ADMIN_TABS[0]:
                return (
                <DataTable
                    data={productList}
                    filter={filter}
                    filterCallback={filterCallback}
                    mapCallback={mapCallback}
                    fields={PRODUCT_FIELDS}
                    showFilters
                    updateFilterValues={updateFilterValues}
                    filterValues={filterValues}
                />)
            case ADMIN_TABS[1]:
                return <ProdutoForm selectedProduct={selectedProduct} supplyList={supplyList}/>
            default:
                return null
        }
    }
    return (
        <Container>
            <SectionTitle>Produtos</SectionTitle>
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
                    <InputWithLabel
                        label='Filtrar'
                        value={filter}
                        onChange={setFilter}
                    />} */}
            </TabsAndFilter>
            {renderContent()}
        </Container>
    )
}

export default ProdutoSection