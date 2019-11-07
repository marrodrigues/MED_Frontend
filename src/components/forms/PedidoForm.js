import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import axios from 'axios'
import { BaseForm, InputWithLabel } from '../base'
import { ButtonOrSpinner } from '../base/button'
import { setLoading, setNotLoading } from '../../actions'
import Select from "../select";

const StyledBaseForm = styled(BaseForm)`
max-width: 330px;
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

const formasDePagamento = [
    { value: '1', label: 'Débito'},
    { value: '2', label: 'Crédito'},
]
const PedidoForm = ({
    selectedOrder: initial,
    setIsLoading,
    setIsNotLoading,
    loading,
    clientList = [],
    employeeList = [],
    productList = [],
    ...props
}) => {
    const [selectedOrder, setSelectedOrder] = useState(initial || {})
    useEffect(() => {
        setSelectedOrder(selectedOrder)
    }, [selectedOrder])
      
    const [codigo, setCodigo] = useState(selectedOrder.codigo || '')
    // const [status, setStatus] = useState(selectedOrder.status || '')
    const [forma_pagamento, setFormaPagamento] = useState(selectedOrder.forma_pagamento || formasDePagamento[0].value)
    // const [data_pedido, setDataPedido] = useState(selectedOrder.data_pedido || '')
    const [observacao, setObsevacao] = useState(selectedOrder.observacao || '')
    const [client, setClient] = useState(clientList[0] && clientList[0].id || {})
    const [employee, setEmployee] = useState(employeeList[0] && employeeList[0].id || {})
    const [product, setProduct] = useState(productList[0] && productList[0].id || {})
    console.log(clientList, employeeList, productList)
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
    const onChangeProduct = event => {
        setProduct(event.target.value)
    }
    const onSubmit = event => {
        event.stopPropagation()
        event.preventDefault()
        const header ={ headers : {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIyLCJpYXQiOjE1NTYxNzY5MDR9.pUgD6sXF_DlRnJSNIVqHlKe9lrqjDVkZSNEWZpjPiUE',
            "Content-Type": 'application/json'
        }}
        const newPedido = {
            codigo,
            forma_pagamento,
            clienteId: client,
            funcionarioId: employee,
            produtos: [{
                id: product,
                qtd: 1
            }],
            observacao
        }
        console.log(newPedido)
        axios.post('https://med-backend-dev.herokuapp.com/pedidos',
            newPedido,
            header)
            .then(response => {
                alert('Pedido criado com sucesso')
                // debugger
            })
            .catch(error => {
                alert('Aconteceu algo de errado na criação do pedido')
                // debugger
            })
    }
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
            <Select
                label='Produtos'
                objectList={productList}
                fieldForValue={'id'}
                fieldForLabel={'nome'}
                onChangeValue={onChangeProduct}
            />
            <InputWithLabel
                label='Observações'
                value={observacao}
                onChange={setObsevacao}
            />
            <ButtonOrSpinner label='Cadastrar' />
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
