import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import axios from 'axios'
import {BaseForm, BaseLabel, InputWithLabel} from '../base'
import { ButtonOrSpinner } from '../base/button'
import { setLoading, setNotLoading } from '../../actions'
import Select from "../select";
import DataTable from "../admin/sections/DataTable";

const StyledBaseForm = styled(BaseForm)`
// max-width: 330px;
`
// Funcionario
// Admin
// {
// 	"clienteId": 12,
// 	"funcionarioId": 22,
// 	"observacao": "teste2",
//     "codigo": "P2",
//     "forma_pagamento": 1,
//     "produtos": [
//     	{
//     		"id": 22,
//     		"qtd": 2
//     	},
//     	{
//     		"id": 12,
//     		"qtd": 1
//     	}
// 	]
// }


const PedidoForm = ({
    selectedOrder: initial,
    setIsLoading,
    setIsNotLoading,
    loading,
    clientList = [],
    employeeList = [],
    productList = [],
    addToCart,
    codigo, setCodigo,
    forma_pagamento, setFormaPagamento,
    observacao, setObservacao,
    client, setClient,
    employee, setEmployee,
    onSubmit,
    formasDePagamento,
    ...props
}) => {
    const [selectedOrder, setSelectedOrder] = useState(initial || {})
    // useEffect(() => {
    //     setSelectedOrder(selectedOrder)
    // }, [selectedOrder])
      
    // const [codigo, setCodigo] = useState(selectedOrder.codigo || '')
    // const [status, setStatus] = useState(selectedOrder.status || '')
    // const [forma_pagamento, setFormaPagamento] = useState(selectedOrder.forma_pagamento || formasDePagamento[0].value)
    // const [data_pedido, setDataPedido] = useState(selectedOrder.data_pedido || '')
    // const [observacao, setObsevacao] = useState(selectedOrder.observacao || '')
    // const [client, setClient] = useState(clientList[0] && clientList[0].id || {})
    // const [employee, setEmployee] = useState(employeeList[0] && employeeList[0].id || {})
    // const [product, setProduct] = useState(productList[0] && productList[0].id || {})
    // const [errors, setErrors] = useState({})
    const onChangePagamento = event => {
        setFormaPagamento(event.target.value)
    }
    const onChangeClient = event => {
        setClient(event.target.value)
    }
    const onChangeEmployee = event => {
        setEmployee(event.target.value)
    }
    const fields = [ 'nome', 'tamanho', 'valor']
    const mapCallback = product => (
        <tr key={product.nome} onClick={() => { addToCart(product) }}>
            {fields.map(field => <td key={`${field}-${product.nome}`}>{product[field]}</td>)}
        </tr>
    )
    return (
        <StyledBaseForm key='Pedido-form' id='Pedido-form' onSubmit={onSubmit} {...props} >
            <InputWithLabel
                label='Código'
                value={codigo}
                onChange={setCodigo}
            />
            <Select
                label='Forma de pagamento'
                objectList={formasDePagamento}
                fieldForValue={'value'}
                fieldForLabel={'label'}
                onChangeValue={onChangePagamento}
            />
            <Select
                label='Cliente'
                objectList={clientList}
                fieldForValue={'id'}
                fieldForLabel={'nome'}
                onChangeValue={onChangeClient}
            />
            <Select
                label='Funcionário'
                objectList={employeeList}
                fieldForValue={'id'}
                fieldForLabel={'nome'}
                onChangeValue={onChangeEmployee}
            />

            <BaseLabel color='#236C4A'>Produtos (Clique para adicionar ao carrinho)</BaseLabel>
            {productList.length > 0
            ? <DataTable
                data={productList}
                fields={fields}
                mapCallback={mapCallback}
            />
            : null}

            <InputWithLabel
                label='Observações'
                value={observacao}
                onChange={setObservacao}
            />
            {/*<ButtonOrSpinner label='Cadastrar' />*/}
        </StyledBaseForm>
    )
}

const mapStateToProps = state => {
    const { app } = state
    const { loading } = app
    return { loading }
}
const mapDispatchToProps = dispatch => ({
    setIsLoading: () => {
        dispatch(setLoading())
    },
    setIsNotLoading: () => {
        dispatch(setNotLoading())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(PedidoForm)
