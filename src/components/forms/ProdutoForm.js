import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import {BaseForm, BaseLabel, InputWithLabel} from '../base'
import { ButtonOrSpinner } from '../base/button'
import { setLoading, setNotLoading } from '../../actions'
import Select from "../select";
import BaseInput from "../base/input/BaseInput";

const StyledBaseForm = styled(BaseForm)`
max-width: 330px;
`
const CheckBoxContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    input {
        max-width: 125px;
    }
`

const tiposProduto = [
    { value: '1', label: 'Pizza'},
    { value: '2', label: 'Bebida'},
]

const tamanhosBebida = [
    { value: 'Lata'},
    { value: '600 mL'},
    { value: '2 Litros'},
]
const tamanhosPizza = [
    { value: 'Brotinho'},
    { value: 'Média'},
    { value: 'Grande'},
    { value: 'Gigante' },
]
const ProdutoForm = ({ selectedProduct: initial, supplyList, setIsLoading, setIsNotLoading, loading, ...props }) => {
    const [selectedProduct, setSelectedProduct] = useState(initial || {})
    useEffect(() => {
        setSelectedProduct(selectedProduct)
        if (selectedProduct.tipo === '1') {
            setTipoProduto(tiposProduto[0].value)
        } else {
            setTipoProduto(tiposProduto[1].value)
        }
        setTamanho(selectedProduct.tamanho)
    }, [selectedProduct])
    const [nome, setNome] = useState(selectedProduct.nome || '')
    const [tamanho, setTamanho] = useState(selectedProduct.tamanho || '')
    const [valor, setValor] = useState(selectedProduct.valor || '')
    const [insumos, setInsumos] = useState(selectedProduct.insumos || [])
    const [tipoProduto, setTipoProduto] = useState(tiposProduto[0].value)
    const onChangeTipoProduto = event => {
        setTipoProduto(event.target.value)
    }
    const onChangeTamanho = event => {
        setTamanho(event.target.value)
    }
    const isChecked = (supply) => insumos.findIndex(_supply => _supply.id === supply.id) > -1
    const onSubmit = event => {
        event.stopPropagation()
        event.preventDefault()
    }
    const getSupplyQuantity = supply => {
        const insumo = (insumos || []).find(_supply => _supply.id === supply.id)
        return insumo && insumo.qtd || ''
    }
    const handleQtdChange = (supply, value) => {
        let _insumos = insumos.slice()
        let supplyIndex = _insumos.findIndex(_supply => _supply.id === supply.id)
        _insumos[supplyIndex].qtd = Number(value)
        setInsumos(_insumos)
    }
    const handleCheckChange = (supply, event) => {
        let _insumos = insumos.slice()
        if (isChecked(supply)) {
            _insumos = _insumos.filter(_supply => _supply.id !== supply.id)
        } else {
            _insumos.push({ id: supply.id, qtd: 1 })
        }
        setInsumos(_insumos)
    }
    const [errors, setErrors] = useState({})
    return (
        <StyledBaseForm key='Produto-form' id='Produto-form' {...props} onSubmit={onSubmit} >
            <InputWithLabel
                label='Nome'
                value={nome}
                onChange={setNome}
            />
            <Select
                label='Tipo de produto'
                objectList={tiposProduto}
                fieldForValue={'value'}
                fieldForLabel={'label'}
                onChangeValue={onChangeTipoProduto}
            />
            <Select
                label='Tamanho'
                objectList={tipoProduto === '1' ? tamanhosPizza : tamanhosBebida}
                fieldForValue={'value'}
                fieldForLabel={'value'}
                onChangeValue={onChangeTamanho}
            />
            <InputWithLabel
                label='Valor'
                value={valor}
                onChange={setValor}
                type='number'
            />
            {
                supplyList.length && tipoProduto === '1'
                    ? <>
                        <BaseLabel color={'#236C4A'}>Insumos</BaseLabel>
                        {supplyList.map(supply => {
                            const checked = isChecked(supply)
                            const qtd = getSupplyQuantity(supply)
                            return (
                            <CheckBoxContainer>
                                <input type='checkbox' checked={checked} onChange={(event) => handleCheckChange(supply, event)}/>
                                <BaseLabel color={'#236C4A'}>{supply.descricao}</BaseLabel>
                                <BaseInput
                                    type='number'
                                    min={1}
                                    disabled={!checked}
                                    value={qtd}
                                    onChange={(event) => handleQtdChange(supply, event.target.value)}
                                />
                            </CheckBoxContainer>
                        )}

                        )}
                    </>
                    : null
            }
            <ButtonOrSpinner label={selectedProduct.id ? 'Atualizar' : 'Cadastrar'} />
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

export default connect(mapStateToProps, mapDispatchToProps)(ProdutoForm)
