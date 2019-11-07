import React, { useState, useEffect } from 'react'
import { Container, SectionTitle, TabsAndFilter, TabsContainer, Tab } from './baseSection'
import { ADMIN_TABS } from '../../../util/constants'
import { InputWithLabel } from '../../base'
import ProdutoForm from '../../forms/ProdutoForm'
import DataTable from './DataTable'

const ProdutoSection = ({ productList = [], ...props }) => {
    const [selectedTab, setSelectedTab] = useState(ADMIN_TABS[1])
    const [selectedProduct, setSelectedProduct] = useState({})
    useEffect(() => {
        setSelectedTab(ADMIN_TABS[1])
    }, [selectedProduct])
    const [filter, setFilter] = useState('')
    const filterCallback = product => (
        product.nome.includes(filter)
    )
    const fields = [ 'nome', 'tamanho', 'valor']
    const mapCallback = product => (
        <tr key={product.nome} onClick={() => { setSelectedProduct(product) }}>
            {fields.map(field => <td key={`${field}-${product.nome}`}>{product[field]}</td>)}
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
                    fields={fields}
                />)
            case ADMIN_TABS[1]:
                return <ProdutoForm selectedProduct={selectedProduct}/>
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