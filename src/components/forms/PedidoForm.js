import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { BaseForm, InputWithLabel } from '../base'
import { ButtonOrSpinner } from '../base/button'
import { setLoading, setNotLoading } from '../../actions'

const StyledBaseForm = styled(BaseForm)`
max-width: 330px;
`
const PedidoForm = ({ selectedOrder: initial, setIsLoading, setIsNotLoading, loading, ...props }) => {
    const [selectedOrder, setSelectedOrder] = useState(initial || {})
    useEffect(() => {
        setSelectedOrder(selectedOrder)
    }, [selectedOrder])
      
    const [codigo, setCodigo] = useState(selectedOrder.codigo || '')
    const [status, setStatus] = useState(selectedOrder.status || '')
    const [forma_pagamento, setFormaPagamento] = useState(selectedOrder.forma_pagamento || '')
    const [data_pedido, setDataPedido] = useState(selectedOrder.data_pedido || '')
    const [observacao, setObsevacao] = useState(selectedOrder.observacao || '')
    const [errors, setErrors] = useState({})
    return (
        <StyledBaseForm key='Pedido-form' id='Pedido-form' {...props} >
            <InputWithLabel
                label='Código'
                value={codigo}
                onChange={setCodigo}
            />
            <InputWithLabel
                label='Status'
                value={status}
                onChange={setStatus}
            />
            <InputWithLabel
                label='Forma de pagamento'
                value={forma_pagamento}
                onChange={setFormaPagamento}
            />
            <InputWithLabel
                label='Data do pedido'
                value={data_pedido}
                onChange={setDataPedido}
                type='date'
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
