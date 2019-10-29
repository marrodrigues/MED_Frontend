import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { BaseForm, InputWithLabel } from '../base'
import { ButtonOrSpinner } from '../base/button'
import { setLoading, setNotLoading } from '../../actions'

const StyledBaseForm = styled(BaseForm)`
max-width: 330px;
`
const InsumoForm = ({ selectedSupply: initial, setIsLoading, setIsNotLoading, loading, ...props }) => {
    const [selectedSupply, setSelectedSupply] = useState(initial || {})
    useEffect(() => {
        setSelectedSupply(selectedSupply)
    }, [selectedSupply])
    const [descricao, setDescricao] = useState(selectedSupply.descricao || '')
    const [qtd_unid, setQtdUnidade] = useState(selectedSupply.qtd_unid || '')
    const [unidade, setUnidade] = useState(selectedSupply.unidade || '')
    const [errors, setErrors] = useState({})
    return (
        <StyledBaseForm key='insumo-form' id='insumo-form' {...props} >
            <InputWithLabel
                label='Descrição'
                value={descricao}
                onChange={setDescricao}
            />
            <InputWithLabel
                label='Quantidade por unidade'
                value={qtd_unid}
                onChange={setQtdUnidade}
                type='number'
            />
            <InputWithLabel
                label='Unidade'
                value={unidade}
                onChange={setUnidade}
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

export default connect(mapStateToProps, mapDispatchToProps)(InsumoForm)
