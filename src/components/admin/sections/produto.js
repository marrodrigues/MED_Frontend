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
    const filterCallback = product => (
        product.nome.includes(filter)
    )
    const mapCallback = product => (
        <tr key={product.nome} onClick={() => { setSelectedProduct(product) }}>
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