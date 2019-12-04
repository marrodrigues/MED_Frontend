import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import axios from 'axios'
import {BaseForm, BaseLabel, InputWithLabel} from '../base'
import BaseButton, { ButtonOrSpinner } from '../base/button'
import { setLoading, setNotLoading } from '../../actions'
import Select from "../select";
import DataTable from "../admin/sections/DataTable";
import {formatMoney} from "../../util/string";
import {PRODUCT_FIELDS, STATUSES} from '../../util/constants'
import InputRow from "../base/form/InputRow";


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
    clientPage,
    onBlurCodigo,
    clearOrder,
    status, setStatus,
    makeOrder,
    selectedOrder,
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
    const onChangeStatus = event => {
        setStatus(event.target.value)
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
            {
                selectedOrder.status > 0 &&
                <InputRow>
                    <Select
                        label='Status'
                        objectList={STATUSES}
                        fieldForValue={'value'}
                        fieldForLabel={'label'}
                        value={status}
                        onChangeValue={onChangeStatus}
                    />
                    <div style={{marginLeft: 'auto'}}>
                        <BaseButton onClick={makeOrder}>Alterar Status</BaseButton>
                    </div>
                </InputRow>
            }
            <InputWithLabel
                label='Código'
                value={codigo}
                onChange={setCodigo}
                disabled={!newOrder || disabledByStatus}
                onBlur={onBlurCodigo}
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
            {
                !clientPage &&
                <Select
                    label='Funcionário'
                    objectList={employeeList}
                    fieldForValue={'id'}
                    fieldForLabel={'nome'}
                    onChangeValue={onChangeEmployee}
                    disabled={!newOrder || disabledByStatus}
                />
            }

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

                <div style={{marginLeft: 'auto'}}>
                    <BaseButton onClick={clearOrder}>Limpar</BaseButton>
                </div>

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
