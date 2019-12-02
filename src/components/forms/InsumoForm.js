import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { BaseForm, InputWithLabel } from '../base'
import BaseButton, { ButtonOrSpinner } from '../base/button'
import { setLoading, setNotLoading } from '../../actions'
import Select from "../select";
import {FuncionarioProvider, InsumoProvider} from "../../providers";
import DescricaoInputWithLabel from "../base/input/DescricaoInputWithLabel";
import {reloadWindow} from "../../util/constants";

const StyledBaseForm = styled(BaseForm)`
max-width: 330px;
`

const unidades = [
    { value: 'gramas', label: 'Gramas'},
]

const InsumoForm = ({ selectedSupply: initial, setIsLoading, setIsNotLoading, loading, ...props }) => {
    const [selectedSupply, setSelectedSupply] = useState(initial || {})
    useEffect(() => {
        setSelectedSupply(selectedSupply)
    }, [selectedSupply])
    const [descricao, setDescricao] = useState(selectedSupply.descricao || '')
    const [qtd_unid, setQtdUnidade] = useState(selectedSupply.qtd_unid || '')
    const [unidade, setUnidade] = useState(selectedSupply.unidade || unidades[0].value)
    const [errors, setErrors] = useState({})
    const onSubmit = event => {
        event.stopPropagation()
        event.preventDefault()
        const insumoObj = { descricao, qtd_unid, unidade }
        InsumoProvider.createOrUpdate({ id: selectedSupply.id, ...insumoObj })
    }
    const onClickDelete = () => {
        InsumoProvider.delete(selectedSupply.id, reloadWindow)
    }
    const descricaoExistsCallback = (data) => {
        setSelectedSupply(data)
        setQtdUnidade(data.qtd_unid)
        setUnidade(data.unidade)
    }
    const descricaoNotFoundCallback = () => {
        setSelectedSupply({})
        setQtdUnidade('')
        setUnidade(unidades[0].value)
    }
    return (
        <StyledBaseForm key='insumo-form' id='insumo-form' {...props} onSubmit={onSubmit} >
            <DescricaoInputWithLabel
                value={descricao}
                onChange={setDescricao}
                descricaoExistsCallback={descricaoExistsCallback}
                descricaoNotFoundCallback={descricaoNotFoundCallback}
            />
            <InputWithLabel
                label='Quantidade por unidade'
                value={qtd_unid}
                onChange={setQtdUnidade}
                type='number'
            />
            <Select
                label='Unidade'
                objectList={unidades}
                fieldForValue={'value'}
                fieldForLabel={'label'}
                onChangeValue={setUnidade}
            />

            <ButtonOrSpinner label={selectedSupply.id ? 'Atualizar' : 'Cadastrar'} />
            {selectedSupply.id
                ?
                <div style={{marginLeft: 'auto'}}>
                    <BaseButton onClick={onClickDelete}>Deletar</BaseButton>
                </div>
            : null}
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
