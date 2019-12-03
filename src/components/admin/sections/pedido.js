import React, { useState, useEffect } from 'react'
import { Container, SectionTitle, TabsAndFilter, TabsContainer, Tab } from './baseSection'
import {ORDER_TABS, ORDER_FIELDS, FORMAS_PAGAMENTO, STATUSES} from '../../../util/constants'
import PedidoForm from '../../forms/PedidoForm'
import DataTable from './DataTable'
import Carrinho from "../../carrinho";
import axios from "axios";
import {params} from "../../../util/request";
import {formatMoney} from "../../../util/string";

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
    const [newOrder, setNewOrder] = useState(true)
    const [status, setStatus] = useState(0)
    useEffect(() => {
        setCodigo(selectedOrder.codigo)
        setFormaPagamento(selectedOrder.forma_pagamento)
        setClient(selectedOrder.clienteId)
        setEmployee(selectedOrder.funcionarioId)
        setObservacao(selectedOrder.observacao)
        const pedprods = selectedOrder.pedidosProdutos || []
        pedprods.forEach(pedprod => {
            const produto = productList.find(p => p.id === pedprod.produtoId)
            addToCart(produto, pedprod.qtd)
        })
        setStatus(selectedOrder.status || 0)
        setNewOrder(!Boolean(selectedOrder.id))
        setSelectedTab(ORDER_TABS[0])

    }, [selectedOrder])
    const [filter, setFilter] = useState('')
    const filterCallback = order => (
        order.codigo.includes(filter)
        || order.data_pedido.includes(filter)
        || order.observacao.includes(filter)
        || order.valor_total.includes(filter)
    )

    const mapCallback = order => {
        console.log(order)
        return (
        <tr key={order.codigo} onClick={() => { setSelectedOrder(order) }}>
            {ORDER_FIELDS.map(field =>
                <td key={`${field}-${order.codigo}`}>
                    {field.name === 'valor_total'
                        ? 'R$ ' + formatMoney(order[field.name])
                        : field.name === 'forma_pagamento'
                            ?  FORMAS_PAGAMENTO.find(forma => Number(forma.value) === Number(order['forma_pagamento'])).label
                            : field.name === 'data_pedido'
                                ? new Date (order['data_pedido']).toLocaleString()
                                : field.name === 'status'
                                    ? STATUSES.find(status => Number(status.value) === Number(order['status'])).label
                                    : order[field.name]}
                </td>)}
        </tr>
    )}
    const addToCart = (product, qtd = 1) => {
        let _carrinho = carrinho.slice()
        _carrinho.push({...product, qtd})
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
    const [forma_pagamento, setFormaPagamento] = useState(selectedOrder.forma_pagamento || FORMAS_PAGAMENTO[0].value)
    const [observacao, setObservacao] = useState(selectedOrder.observacao || '')
    const [client, setClient] = useState(clientList[0] && clientList[0].id || {})
    const [employee, setEmployee] = useState(employeeList[0] && employeeList[0].id || {})
    const onBlurCodigo = (event) => {
        const orderByCode = orderList.find(order => order.codigo.toLowerCase() === event.target.value.toLowerCase())
        if (orderByCode) {
            setSelectedOrder(orderByCode)
        }
    }
    const clearOrder = e => {
        e.stopPropagation()
        e.preventDefault()
        setCodigo('')
        setFormaPagamento(FORMAS_PAGAMENTO[0].value)
        setObservacao('')
        setClient(clientList[0] && clientList[0].id || {})
        setEmployee(employeeList[0] && employeeList[0].id || {})
        setCarrinho([])
        setNewOrder(true)
        setStatus(0)
        setSelectedOrder({})
    }
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
        if (newOrder) {
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
        } else {
            axios.put('https://med-backend-dev.herokuapp.com/pedidos/' + selectedOrder.id,
            newPedido,
            params)
            .then(response => {
                alert('Pedido atualizado com sucesso')
                debugger
            })
            .catch(error => {
                alert('Aconteceu algo de errado na atualização do pedido')
                debugger
            })
        }

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
                return <Carrinho
                    carrinho={carrinho}
                    changeQtd={changeQtd}
                    makeOrder={makeOrder}
                    newOrder={newOrder}
                    disabledByStatus={status > 1}
                />
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
                    formasDePagamento={FORMAS_PAGAMENTO}
                    observacao={observacao}
                    setObservacao={setObservacao}
                    client={client}
                    setClient={setClient}
                    employee={employee}
                    setEmployee={setEmployee}
                    newOrder={newOrder}
                    disabledByStatus={status > 1}
                    onBlurCodigo={onBlurCodigo}
                    clearOrder={clearOrder}
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