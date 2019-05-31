import React from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { params } from '../../util/request'
import InsumoProvider from '../../providers/insumo'

import BaseFormTitle from '../base/form-title'
import BaseLabel from '../base/label'
import BaseInput from '../base/input'
import BaseSelect from '../base/select'
import BaseButton from '../base/button'

import { FORM_INPUT_IDS } from '../../util/constants'

const SupplyForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2vh 5vw;
    background: gray;
`
const options = ['grama', 'litro', 'unidade']

export default class extends React.Component {
    state = {
        [FORM_INPUT_IDS.DESCRICAO]: '',
        [FORM_INPUT_IDS.QTD_UNID]: '',
        [FORM_INPUT_IDS.UNIDADE]: '',
        [FORM_INPUT_IDS.VALOR_UNITARIO]: '',
        isLocked: false,
        isNewSupply: true,
    }
    handleChangeInput = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }
    getSupply = (event) => {
        this.setState({ isLocked: true })
        const descricao = event.target.value
        console.log(descricao)
        // debugger
        axios.get('https://med-backend-dev.herokuapp.com/insumos/descricao/' + descricao, params)
            .then(response => response.data)
            .then(data => {
                debugger
                this.setState({
                    isNewSupply: false,
                    isLocked: false,
                    ...data
                })
            })
            .catch(error => { 
                // debugger
                console.log(error)
                this.setState({
                    isNewSupply: true,
                    isLocked: false,
                    [FORM_INPUT_IDS.QTD_UNID]: '',
                    [FORM_INPUT_IDS.UNIDADE]: '',
                    [FORM_INPUT_IDS.VALOR_UNITARIO]: '',
                    id: null
                })
            })
    }
    submit = (event) => {
        event.preventDefault()
        event.stopPropagation()
        InsumoProvider.createOrUpdate(this.state)
    }
    deleteSupply = (event) => {
        event.preventDefault()
        event.stopPropagation()
        InsumoProvider.delete(this.state.id)
    }

    render() {
        return (
            <SupplyForm id='supply-form' onSubmit={this.submit}>
                <BaseFormTitle title='Insumo' />
                <BaseLabel htmlFor={FORM_INPUT_IDS.DESCRICAO}>DESCRICAO</BaseLabel>
                <BaseInput
                    id={FORM_INPUT_IDS.DESCRICAO}
                    name={FORM_INPUT_IDS.DESCRICAO}
                    noValidation
                    onChange={this.handleChangeInput}
                    onBlur={this.getSupply}
                    value={this.state[FORM_INPUT_IDS.DESCRICAO]}
                    disabled={this.state.isLocked}
                />
                <BaseLabel htmlFor={FORM_INPUT_IDS.UNIDADE}>UNIDADE</BaseLabel>
                {/* <BaseInput
                    id={FORM_INPUT_IDS.UNIDADE}
                    name={FORM_INPUT_IDS.UNIDADE}
                    noValidation
                    onChange={this.handleChangeInput}
                    value={this.state[FORM_INPUT_IDS.UNIDADE]}
                    disabled={this.state.isLocked}
                /> */}
                <BaseSelect 
                    form='supply-form'
                    name={FORM_INPUT_IDS.UNIDADE}
                    options={options}
                    onChange={this.handleChangeInput}
                    disabled={this.state.isLocked}
                />
                <BaseLabel htmlFor={FORM_INPUT_IDS.QTD_UNID}>Quantidade por unidade</BaseLabel>
                <BaseInput
                    id={FORM_INPUT_IDS.QTD_UNID}
                    name={FORM_INPUT_IDS.QTD_UNID}
                    noValidation
                    onChange={this.handleChangeInput}
                    value={this.state[FORM_INPUT_IDS.QTD_UNID]}
                    type='number'
                    min={1}
                    disabled={this.state.isLocked}
                />
                <BaseLabel htmlFor={FORM_INPUT_IDS.VALOR_UNITARIO}>VALOR UNITARIO (em R$)</BaseLabel>
                <BaseInput
                    id={FORM_INPUT_IDS.VALOR_UNITARIO}
                    name={FORM_INPUT_IDS.VALOR_UNITARIO}
                    noValidation
                    onChange={this.handleChangeInput}
                    value={this.state[FORM_INPUT_IDS.VALOR_UNITARIO]}
                    type='number'
                    min={0}
                    step={0.01}
                    disabled={this.state.isLocked}
                />
                {
                    this.state.isNewSupply
                    ? (<BaseButton
                            type='submit'
                        >
                           Cadastrar
                        </BaseButton>)
                    : ( <React.Fragment>
                        <BaseButton
                            type='submit'
                        >
                            Atualizar
                        </BaseButton>
                        <BaseButton
                            onClick={this.deleteSupply}
                        >
                            Deletar
                        </BaseButton>
                    </React.Fragment>)
                }
                
            </SupplyForm>
        )
    }
}