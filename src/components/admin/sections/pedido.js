import React, { useState, useEffect } from 'react'
import { Container, SectionTitle, TabsAndFilter, TabsContainer, Tab } from './baseSection'
import { ORDER_TABS, ORDER_FIELDS } from '../../../util/constants'
import PedidoForm from '../../forms/PedidoForm'
import DataTable from './DataTable'
import Carrinho from "../../carrinho";
import axios from "axios";
import {params} from "../../../util/request";


const formasDePagamento = [
    { value: '1', label: 'Débito'},
    { value: '2', label: 'Crédito'},
]
const PedidoSection = ({
    orderList = [],
    clientList = [],
    employeeList = [],
    productList = [],
    ...props
}) => {
    const [selectedTab, setSelectedTab] = useState(ORDER_TABS[0])
    const [selectedOrder, setSelectedOrder] = useState({})
    const [carrinho, setCarrinho] = useState([])
    useEffect(() => {
        setSelectedTab(ORDER_TABS[1])
    }, [selectedOrder])
    const [filter, setFilter] = useState('')
    const filterCallback = order => (
        order.codigo.includes(filter)
        || order.data_pedido.includes(filter)
        || order.observacao.includes(filter)
        || order.valor_total.includes(filter)
    )

    const mapCallback = order => (
        <tr key={order.codigo} onClick={() => { setSelectedOrder(order) }}>
            {ORDER_FIELDS.map(field => <td key={`${field}-${order.codigo}`}>{order[field.name]}</td>)}
        </tr>        
    )
    const addToCart = (product) => {
        let _carrinho = carrinho.slice()
        _carrinho.push({...product, qtd: 1})
        setCarrinho(_carrinho)
    }
    const changeQtd = (product, change) => {
        let _carrinho = carrinho.slice()
        const index = _carrinho.map(product => product.id).indexOf(product.id)
        _carrinho[index].qtd += change
        if (_carrinho[index].qtd === 0) {
            _carrinho.splice(index, 1)
        }
        setCarrinho(_carrinho)
    }
    const carrinhoIds = carrinho.map(product => product.id)
    const [codigo, setCodigo] = useState(selectedOrder.codigo || '')
    const [forma_pagamento, setFormaPagamento] = useState(selectedOrder.forma_pagamento || formasDePagamento[0].value)
    const [observacao, setObservacao] = useState(selectedOrder.observacao || '')
    const [client, setClient] = useState(clientList[0] && clientList[0].id || {})
    const [employee, setEmployee] = useState(employeeList[0] && employeeList[0].id || {})
    const makeOrder = () => {
        const newPedido = {
            codigo,
            forma_pagamento,
            clienteId: client,
            funcionarioId: employee,
            produtos: carrinho.map(product => ({id: product.id, qtd: product.qtd})),
            observacao
        }
        console.log(newPedido)
        axios.post('https://med-backend-dev.herokuapp.com/pedidos',
            newPedido,
            params)
            .then(response => {
                alert('Pedido criado com sucesso')
                debugger
            })
            .catch(error => {
                alert('Aconteceu algo de errado na criação do pedido')
                debugger
            })
    }

    const renderContent = () => {
        switch (selectedTab) {
            case ORDER_TABS[2]:
                return (
                <DataTable
                    data={orderList}
                    filter={filter}
                    filterCallback={filterCallback}
                    mapCallback={mapCallback}
                    fields={ORDER_FIELDS}
                />)
            case ORDER_TABS[1]:
                return <Carrinho carrinho={carrinho} changeQtd={changeQtd} makeOrder={makeOrder}/>
            case ORDER_TABS[0]:
                return <PedidoForm
                    selectedOrder={selectedOrder}
                    clientList={clientList.map(client => ({id: client.id, nome: client.pessoa.nome}))}
                    employeeList={employeeList.map(employee => ({id: employee.id, nome: employee.pessoa.nome}))}
                    productList={productList.filter(product => !carrinhoIds.includes(product.id))}
                    addToCart={addToCart}
                    codigo={codigo}
                    setCodigo={setCodigo}
                    forma_pagamento={forma_pagamento}
                    setFormaPagamento={setFormaPagamento}
                    formasDePagamento={formasDePagamento}
                    observacao={observacao}
                    setObservacao={setObservacao}
                    client={client}
                    setClient={setClient}
                    employee={employee}
                    setEmployee={setEmployee}
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
                    {ORDER_TABS.map(tab =>
                        <Tab
                            isSelected={selectedTab === tab}
                            key={tab}
                            onClick={() => setSelectedTab(tab)}
                        >
                            {tab === 'Carrinho' ? `${tab} (${carrinho.length})` : tab}
                        </Tab>
                    )}
                </TabsContainer>
            </TabsAndFilter>
            {renderContent()}
        </Container>
    )
}

export default PedidoSection