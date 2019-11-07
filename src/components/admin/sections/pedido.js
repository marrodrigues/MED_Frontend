import React, { useState, useEffect } from 'react'
import { Container, SectionTitle, TabsAndFilter, TabsContainer, Tab } from './baseSection'
import { ADMIN_TABS } from '../../../util/constants'
import { InputWithLabel } from '../../base'
import PedidoForm from '../../forms/PedidoForm'
import DataTable from './DataTable'

const PedidoSection = ({
    orderList = [],
    clientList = [],
    employeeList = [],
    productList = [],
    ...props
}) => {
    const [selectedTab, setSelectedTab] = useState(ADMIN_TABS[1])
    const [selectedOrder, setSelectedOrder] = useState({})
    useEffect(() => {
        setSelectedTab(ADMIN_TABS[1])
    }, [selectedOrder])
    const [filter, setFilter] = useState('')
    const filterCallback = order => (
        order.codigo.includes(filter)
        || order.data_pedido.includes(filter)
        || order.observacao.includes(filter)
        || order.valor_total.includes(filter)
    )

    const fields = [ 'codigo', 'status', 'data_pedido', 'valor_total', 'forma_pagamento', 'observacao']
    const mapCallback = order => (
        <tr key={order.codigo} onClick={() => { setSelectedOrder(order) }}>
            {fields.map(field => <td key={`${field}-${order.codigo}`}>{order[field]}</td>)}
        </tr>        
    )

    const renderContent = () => {
        switch (selectedTab) {
            case ADMIN_TABS[0]:
                return (
                <DataTable
                    data={orderList}
                    filter={filter}
                    filterCallback={filterCallback}
                    mapCallback={mapCallback}
                    fields={fields}
                />)
            case ADMIN_TABS[1]:
                return <PedidoForm
                    selectedOrder={selectedOrder}
                    clientList={clientList.map(client => ({id: client.id, nome: client.pessoa.nome}))}
                    employeeList={employeeList.map(employee => ({id: employee.id, nome: employee.pessoa.nome}))}
                    productList={productList.map(product => ({id: product.id, nome: product.nome}))}
                />
            default:
                return null
        }
    }
    return (
        <Container>
            <SectionTitle>Pedidos</SectionTitle>
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

export default PedidoSection