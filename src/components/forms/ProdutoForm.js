import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { BaseForm, InputWithLabel } from '../base'
import { ButtonOrSpinner } from '../base/button'
import { setLoading, setNotLoading } from '../../actions'

const StyledBaseForm = styled(BaseForm)`
max-width: 330px;
`
const ProdutoForm = ({ selectedProduct: initial, setIsLoading, setIsNotLoading, loading, ...props }) => {
    const [selectedProduct, setSelectedProduct] = useState(initial || {})
    useEffect(() => {
        setSelectedProduct(selectedProduct)
    }, [selectedProduct])
    const [nome, setNome] = useState(selectedProduct.nome || '')
    const [tamanho, setTamanho] = useState(selectedProduct.tamanho || '')
    const [valor, setValor] = useState(selectedProduct.valor || '')
    const [insumos, setInsumos] = useState(selectedProduct.insumos || '')
    const [errors, setErrors] = useState({})
    return (
        <StyledBaseForm key='Produto-form' id='Produto-form' {...props} >
            <InputWithLabel
                label='Nome'
                value={nome}
                onChange={setNome}
            />
            <InputWithLabel
                label='Tamanho'
                value={tamanho}
                onChange={setTamanho}
            />
            <InputWithLabel
                label='Valor'
                value={valor}
                onChange={setValor}
                type='number'
            />
            <InputWithLabel
                label='Insumos'
                value={insumos}
                onChange={setInsumos}
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

export default connect(mapStateToProps, mapDispatchToProps)(ProdutoForm)
