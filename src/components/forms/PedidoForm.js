import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import axios from 'axios'
import {BaseForm, BaseLabel, InputWithLabel} from '../base'
import { ButtonOrSpinner } from '../base/button'
import { setLoading, setNotLoading } from '../../actions'
import Select from "../select";
import DataTable from "../admin/sections/DataTable";
import {formatMoney} from "../../util/string";
import { PRODUCT_FIELDS } from '../../util/constants'


const StyledBaseForm = styled(BaseForm)`
// max-width: 330px;
`

const PedidoForm = ({
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
    newOrder,
    disabledByStatus,
    ...props
}) => {
    const onChangePagamento = event => {
        setFormaPagamento(event.target.value)
    }
    const onChangeClient = event => {
        setClient(event.target.value)
    }
    const onChangeEmployee = event => {
        setEmployee(event.target.value)
    }

    const mapCallback = (product, index) => (
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
    return (
        <StyledBaseForm key='Pedido-form' id='Pedido-form' onSubmit={onSubmit} {...props} >
            <InputWithLabel
                label='Código'
                value={codigo}
                onChange={setCodigo}
                disabled={!newOrder || disabledByStatus}
            />
            <Select
                label='Forma de pagamento'
                objectList={formasDePagamento}
                fieldForValue={'value'}
                fieldForLabel={'label'}
                onChangeValue={onChangePagamento}
                disabled={!newOrder || disabledByStatus}
            />
            <Select
                label='Cliente'
                objectList={clientList}
                fieldForValue={'id'}
                fieldForLabel={'nome'}
                onChangeValue={onChangeClient}
                disabled={!newOrder || disabledByStatus}
            />
            <Select
                label='Funcionário'
                objectList={employeeList}
                fieldForValue={'id'}
                fieldForLabel={'nome'}
                onChangeValue={onChangeEmployee}
                disabled={!newOrder || disabledByStatus}
            />

            <BaseLabel color='#236C4A'>Produtos (Clique para adicionar ao carrinho)</BaseLabel>
            {productList.length > 0 && !disabledByStatus
            ? <DataTable
                data={productList}
                fields={PRODUCT_FIELDS}
                mapCallback={mapCallback}
                exportable={false}
            />
            : <BaseLabel color='#236C4A'>Não é possivel alterar os produtos de pedidos que já passaram da fase de confecção</BaseLabel>}

            <InputWithLabel
                label='Observações'
                value={observacao}
                onChange={setObservacao}
                disabled={disabledByStatus}
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
