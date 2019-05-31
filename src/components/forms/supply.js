import React from 'react'
import styled from 'styled-components'
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
const ButtonsContainer = styled.div`
    display: flex;
    justify-content: space-around;
`
const Message = styled.span`
    color: white;
    font-size: 18px;
`
const options = ['grama', 'litro', 'unidade']

export default class extends React.Component {
    state = {
        [FORM_INPUT_IDS.DESCRICAO]: '',
        [FORM_INPUT_IDS.QTD_UNID]: '',
        [FORM_INPUT_IDS.UNIDADE]: options[0],
        [FORM_INPUT_IDS.VALOR_UNITARIO]: '',
        id: null,
        isLocked: false,
        isNewSupply: true,
        message: '',
    }
    handleChangeInput = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }
    clearInputs = () => {
        this.setState({
            isNewSupply: true,
            isLocked: false,
            [FORM_INPUT_IDS.QTD_UNID]: '',
            [FORM_INPUT_IDS.UNIDADE]: '',
            [FORM_INPUT_IDS.VALOR_UNITARIO]: '',
            id: null
        })
    }
    setMessage = (message) => {
        this.setState({message})
        setTimeout(() => { this.setState({message: ''}) }, 3000) 
    }
    supplyExistsCallback = (supply) => {
        this.setState({
            isNewSupply: false,
            isLocked: false,
            ...supply,
        })
        this.setMessage('Insumo encontrado')
    }
    supplyDoesNotExistCallback = () => {
        this.clearInputs()
    }
    errorCallback = () => {
        this.setMessage('Erro inesperado')
        setTimeout(() => { window.location.reload() }, 1000)
    }

    getSupply = (event) => {
        this.setState({ isLocked: true })
        const descricao = event.target.value
        console.log(descricao)
        // debugger
        InsumoProvider.getByDescription(
            descricao,
            this.supplyExistsCallback,
            this.supplyDoesNotExistCallback,
            this.errorCallback
        )
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
                <BaseLabel htmlFor={FORM_INPUT_IDS.UNIDADE}>UNIDADE de Medida</BaseLabel>
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
                    value={this.state[FORM_INPUT_IDS.UNIDADE]}
                    placeholderMessage='Escolha a unidade'
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
                <Message>{this.state.message}</Message>
                {
                    this.state.isNewSupply
                    ? (<BaseButton
                            type='submit'
                        >
                           Cadastrar
                        </BaseButton>)
                    : ( <ButtonsContainer>
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
                    </ButtonsContainer>)
                }
            </SupplyForm>
        )
    }
}