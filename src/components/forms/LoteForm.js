import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { BaseForm, InputWithLabel } from '../base'
import { ButtonOrSpinner } from '../base/button'
import { setLoading, setNotLoading } from '../../actions'
import LoteInputWithLabel from "../base/input/LoteInputWithLabel";
import LoteProvider from "../../providers/LoteProvider";
import Select from "../select";
import {reloadWindow} from "../../util/constants";

const StyledBaseForm = styled(BaseForm)`
max-width: 330px;
`
const tipoLote = [
    { value: 'insumo', label: 'Insumo'},
    { value: 'produto', label: 'Produto'},
]
const LoteForm = ({ selectedBundle: initial, supplyList, productList, setIsLoading, setIsNotLoading, loading, ...props }) => {
    const [selectedBundle, setSelectedBundle] = useState(initial || {})
    useEffect(() => {
        const { id, lote, qtd, validade, valor_unitario, insumoId, produtoId } = selectedBundle
        setLote(lote)
        setQtd(qtd)
        setValidade(validade)
        setValorUnitario(valor_unitario)
        if (insumoId) {
            setBundleType(tipoLote[0].value)
            setInsumo(insumoId)
        }
        if (produtoId) {
            setBundleType(tipoLote[1].value)
            setProduto(produtoId)
        }
    }, [selectedBundle])
    // const { id, lote, qtd, validade, valor_unitario, insumoId, produtoId } = data

    const [lote, setLote] = useState(selectedBundle.lote || '')
    const [qtd, setQtd] = useState(selectedBundle.qtd || '')
    const [validade, setValidade] = useState(selectedBundle.validade || '')
    const [valor_unitario, setValorUnitario] = useState(selectedBundle.valor_unitario || '')
    const [insumo, setInsumo] = useState(selectedBundle.insumoId || '')
    const [produto, setProduto] = useState(selectedBundle.produtoId || '')
    const [bundleType, setBundleType] = useState(tipoLote[0].value)
    const loteExistsCallback = (data) => {
        setSelectedBundle(data)
        setQtd(data.qtd)
        setInsumo(data.insumoId)
        setProduto(data.produtoId)
        setValidade(data.validade)
        setValorUnitario(data.valor_unitario)
    }
    const loteNotFoundCallback = () => {
        setSelectedBundle({})
        setQtd('')
        setInsumo(supplyList[0] && supplyList[0].id || '')
        setProduto('')
        setValidade('')
        setValorUnitario('')
    }
    const onChangeProduct = event => {
        setProduto(event.target.value)
    }
    const onChangeSupply = event => {
        setInsumo(event.target.value)
    }
    const onChangeBundleType = event => {
        const tipo = event.target.value
        setBundleType(tipo)
        if (tipo === 'insumo') {
            setProduto('')
            setInsumo(supplyList[0] && supplyList[0].id || '')
        } else {
            setInsumo('')
            setProduto(productList[0] && productList[0].id || '')
        }
    }
    const filteredProductList = productList.filter(product => product.tipo === '2')
    const onSubmit = event => {
        event.stopPropagation()
        event.preventDefault()
        const loteObj = { lote, qtd, validade, valor_unitario, insumoId: insumo, produtoId: produto }
        console.log(loteObj)
        LoteProvider.createOrUpdate({ id: selectedBundle.id, ...loteObj }, reloadWindow)
    }

    const [errors, setErrors] = useState({})
    return (
        <StyledBaseForm key='Lote-form' id='Lote-form' {...props} onSubmit={onSubmit}>
            <LoteInputWithLabel
                value={lote}
                onChange={setLote}
                loteExistsCallback={loteExistsCallback}
                loteNotFoundCallback={loteNotFoundCallback}
            />
            <InputWithLabel
                label='Quantidade'
                value={qtd}
                onChange={setQtd}
                type='number'
            />
            <InputWithLabel
                label='Validade'
                value={validade}
                onChange={setValidade}
                type='date'
            />
            <InputWithLabel
                label='Valor Unitário'
                value={valor_unitario}
                onChange={setValorUnitario}
                type='number'
            />
            <Select
                label='Tipo de lote'
                objectList={tipoLote}
                fieldForValue={'value'}
                fieldForLabel={'label'}
                onChangeValue={onChangeBundleType}
                value={bundleType}
            />
            { bundleType === 'insumo'
                ? (<Select
                    label='Insumo'
                    objectList={supplyList}
                    fieldForValue={'id'}
                    fieldForLabel={'descricao'}
                    onChangeValue={onChangeSupply}
                    value={insumo}
                />)
                : (<Select
                    label='Produtos'
                    objectList={filteredProductList}
                    fieldForValue={'id'}
                    fieldForLabel={'nome'}
                    onChangeValue={onChangeProduct}
                    value={produto}
                />)
            }
            <ButtonOrSpinner label={selectedBundle.id ? 'Atualizar' : 'Cadastrar'} />
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

export default connect(mapStateToProps, mapDispatchToProps)(LoteForm)
