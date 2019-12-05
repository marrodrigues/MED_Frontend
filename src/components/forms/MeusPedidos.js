import React, {useEffect, useState} from 'react'
import {BaseForm, BaseLabel, InputWithLabel} from '../base'
import PedidoForm from "./PedidoForm";
import {
    FORMAS_PAGAMENTO,
    MY_ORDERS_TABS,
    ORDER_FIELDS,
    ORDER_TABS,
    PRODUCT_FIELDS, reloadWindow,
    STATUSES
} from "../../util/constants";
import axios from "axios";
import {params} from "../../util/request";
import DataTable from "../admin/sections/DataTable";
import Carrinho from "../carrinho";
import {Container, SectionTitle, Tab, TabsAndFilter, TabsContainer} from "../admin/sections/baseSection";
import {formatMoney} from "../../util/string";
import Select from "../select";
import BaseButton from "../base/button";

const MeusPedidosForm = ({ clientList, initialValues, orderList, productList }) => {
    const [selectedTab, setSelectedTab] = useState(MY_ORDERS_TABS[0])
    const [selectedClient, setSelectedClient] = useState(null)
    const [carrinho, setCarrinho] = useState([])
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
    const [forma_pagamento, setFormaPagamento] = useState(FORMAS_PAGAMENTO[0].value)
    const [observacao, setObservacao] = useState('')
    useEffect(() => {
        const client = (clientList || []).find(client => client && client.pessoa && client.pessoa.id === Number(initialValues.id))
        console.log(client)
        setSelectedClient(client)
    }, [clientList, initialValues])
    const createCodigo = (length) => {
        let result = '';
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let charactersLength = characters.length;
        for ( let i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    const onChangePagamento = event => {
        setFormaPagamento(event.target.value)
    }
    const clearOrder = e => {
        e.stopPropagation()
        e.preventDefault()
        setFormaPagamento(FORMAS_PAGAMENTO[0].value)
        setObservacao('')
        setCarrinho([])
    }
    const makeOrder = (e) => {
        if (e) {
            e.stopPropagation()
            e.preventDefault()
        }
        const newPedido = {
            forma_pagamento,
            clienteId: selectedClient.id,
            funcionarioId: null,
            produtos: carrinho.map(product => ({id: product.id, qtd: product.qtd})),
            observacao,
            codigo: `P-C-${createCodigo(4)}`
        }
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
            .finally(() => { reloadWindow() })
        }
        const [filter, setFilter] = useState('')
        const filterCallback = order => (
            order.codigo.includes(filter)
            || order.data_pedido.includes(filter)
            || order.observacao.includes(filter)
            || order.valor_total.includes(filter)
        )
        const mapHelper = (order, field) => {
            switch (field.name) {
                case 'valor_total':
                    return 'R$ ' + formatMoney(order[field.name])
                case 'forma_pagamento':
                    return FORMAS_PAGAMENTO.find(forma => Number(forma.value) === Number(order['forma_pagamento'])).label
                case 'data_pedido':
                    return new Date (order['data_pedido']).toLocaleString()
                case 'status':
                    return STATUSES.find(status => Number(status.value) === Number(order['status'])).label
                default:
                    return order[field.name]
            }
        }

        const mapCallback = order => {
            console.log(order)
            return (
            <tr key={order.codigo} onClick={() => { }}>
                {ORDER_FIELDS.map(field =>
                    <td key={`${field.name}-${order.codigo}`}>
                        {mapHelper(order, field)}
                    </td>)}
            </tr>
        )}
        const mapCallbackProducts = (product, index) => (
            <tr key={`${product.nome}-${index}`} onClick={() => { addToCart(product) }}>
                {PRODUCT_FIELDS.map(field =>
                    <td key={`${field.name}-${product.nome}`}>
                        {field.name === 'valor'
                            ? 'R$ ' + formatMoney(product[field.name])
                            : product[field.name]
                        }
                    </td>
                )}
            </tr>
        )
        const renderContent = () => {
        switch (selectedTab) {
            case MY_ORDERS_TABS[2]:
                return (<>
                    <SectionTitle>Em andamento</SectionTitle>
                    {
                        selectedClient &&
                        <DataTable
                            data={orderList.filter(order => order.status < 3 && order.clienteId === selectedClient.id)}
                            filter={filter}
                            filterCallback={filterCallback}
                            mapCallback={mapCallback}
                            fields={ORDER_FIELDS}
                        />
                    }
                    <SectionTitle>Finalizados</SectionTitle>
                    {
                        selectedClient &&
                        <DataTable
                            data={orderList.filter(order => order.status > 2 && order.clienteId === selectedClient.id)}
                            filter={filter}
                            filterCallback={filterCallback}
                            mapCallback={mapCallback}
                            fields={ORDER_FIELDS}
                        />
                    }
                </>)
            case MY_ORDERS_TABS[1]:
                return <Carrinho
                    carrinho={carrinho}
                    changeQtd={changeQtd}
                    makeOrder={makeOrder}
                    newOrder
                />
            case MY_ORDERS_TABS[0]:
                return (<>
            <Select
                label='Forma de pagamento'
                objectList={FORMAS_PAGAMENTO}
                fieldForValue={'value'}
                fieldForLabel={'label'}
                onChangeValue={onChangePagamento}
            />
            <BaseLabel color='#236C4A'>Produtos (Clique para adicionar ao carrinho)</BaseLabel>
            {productList.length > 0
            ? <DataTable
                data={productList.filter(product => !carrinhoIds.includes(product.id))}
                fields={PRODUCT_FIELDS}
                mapCallback={mapCallbackProducts}
                exportable={false}
            />
            : <BaseLabel color='#236C4A'>Não é possivel alterar os produtos de pedidos que já passaram da fase de confecção</BaseLabel>}

            <InputWithLabel
                label='Observações'
                value={observacao}
                onChange={setObservacao}
            />
            {/*<ButtonOrSpinner label='Cadastrar' />*/}

                <div style={{marginLeft: 'auto'}}>
                    <BaseButton onClick={clearOrder}>Limpar</BaseButton>
                </div>
            </>
        )
            default:
                return null
        }
    }
    const handleSubmit = e => {

   }
   return (
       <Container>
            <SectionTitle>Meus Pedidos</SectionTitle>
            <TabsAndFilter>
                <TabsContainer>
                    {MY_ORDERS_TABS.map(tab =>
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

export default MeusPedidosForm