import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { BaseForm, InputWithLabel } from '../base'
import { ButtonOrSpinner } from '../base/button'
import { setLoading, setNotLoading } from '../../actions'

const StyledBaseForm = styled(BaseForm)`
max-width: 330px;
`
const LoteForm = ({ selectedBundle: initial, setIsLoading, setIsNotLoading, loading, ...props }) => {
    const [selectedBundle, setSelectedBundle] = useState(initial || {})
    useEffect(() => {
        setSelectedBundle(selectedBundle)
    }, [selectedBundle])
    // const { id, lote, qtd, validade, valor_unitario, insumoId, produtoId } = data

    const [lote, setLote] = useState(selectedBundle.lote || '')
    const [qtd, setQtd] = useState(selectedBundle.qtd || '')
    const [validade, setValidade] = useState(selectedBundle.validade || '')
    const [valor_unitario, setValorUnitario] = useState(selectedBundle.valor_unitario || '')
    const [insumo, setInsumo] = useState(selectedBundle.insumoId || '')
    const [produto, setProduto] = useState(selectedBundle.produtoId || '')
    const [errors, setErrors] = useState({})
    return (
        <StyledBaseForm key='Lote-form' id='Lote-form' {...props} >
            <InputWithLabel
                label='Lote'
                value={lote}
                onChange={setLote}
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
            <InputWithLabel
                label='Insumo'
                value={insumo}
                onChange={setInsumo}
            />
            <InputWithLabel
                label='Produto'
                value={produto}
                onChange={setProduto}
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

export default connect(mapStateToProps, mapDispatchToProps)(LoteForm)
