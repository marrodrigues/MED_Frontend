import React from 'react'
import styled from 'styled-components'
import InsumoProvider from '../../providers/insumo'
import ProdutoProvider from '../../providers/produto'
import LoteProvider from '../../providers/lote'

import BaseFormTitle from '../base/form-title'
import BaseLabel from '../base/label'
import BaseInput from '../base/input'
import BaseSelect from '../base/select'
import BaseButton from '../base/button'
import BaseRadio from '../base/radio'

import { FORM_INPUT_IDS } from '../../util/constants'

const ProductForm = styled.form`
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
const RadioContainer = styled.div`
    display: flex;
`
const CheckBoxContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 350px;
    // border: 1px white dashed;
    input {
        max-width: 125px;
    }
`
const Checkbox = styled.input`

`
const CheckBoxLabel = styled(BaseLabel)`

`

const sizes = ['Brotinho', 'Média', 'Grande', 'Gigante', 'Único']

export default class extends React.Component {
    state = {
        [FORM_INPUT_IDS.NOME]: '',
        [FORM_INPUT_IDS.TAMANHO]: sizes[0],
        [FORM_INPUT_IDS.VALOR]: '',
        id: null,
        supplyList: [],
        insumos: [],
        isLocked: false,
        isNewProduct: true,
        message: '',
    }
    componentDidMount() {
        InsumoProvider.getAll((supplyList) => { this.setState({ supplyList }) })
    }
    handleChangeInput = (event) => {
        if (event.target.name === FORM_INPUT_IDS.TAMANHO) {
            this.setState({ [event.target.name]: event.target.value }, () => this.getProduto())
        } else {
            this.setState({ [event.target.name]: event.target.value })
        }
    }
    handleCheckClick = (supply) => {
        let { insumos = [] } = this.state
        if (this.isChecked(supply)) {
            insumos = insumos.filter(_supply => _supply.id !== supply.id)
        } else {
            insumos.push({ id: supply.id, qtd: 1 })
        }
        this.setState({ insumos })
        debugger
    }
    isChecked = (supply) => {
        let { insumos = [] } = this.state
        let supplyIndex = insumos.findIndex(_supply => _supply.id === supply.id)
        return supplyIndex > -1
    }

    getSupplyQuantity = (supply) => (this.state.insumos || []).find(_supply => _supply.id === supply.id).qtd

    handleQtdChange = (supply, value) => {
        let { insumos = [] } = this.state
        let supplyIndex = insumos.findIndex(_supply => _supply.id === supply.id)
        insumos[supplyIndex].qtd = Number(value)
        this.setState({insumos})
    }
    clearInputs = () => {
        this.setState({
            [FORM_INPUT_IDS.VALOR]: '',
            id: null,
            insumos: [],
            isLocked: false,
            isNewProduct: true,
            message: '',
        })
    }
    setMessage = (message) => {
        this.setState({message})
        setTimeout(() => { this.setState({message: ''}) }, 3000) 
    }
    productExistsCallback = (product) => {
        this.setState({
            ...product,
            isNewProduct: false,
            isLocked: false
        })
        this.setMessage('Produto encontrado')
    }
    productDoesNotExistCallback = () => {
        this.clearInputs()
    }
    errorCallback = () => {
        this.setMessage('Erro inesperado')
        setTimeout(() => { window.location.reload() }, 1000)
    }
    getProduto = (event) => {
        this.setState({ isLocked: true })
        let nome = this.state[FORM_INPUT_IDS.NOME]
        let tamanho = this.state[FORM_INPUT_IDS.TAMANHO]
        debugger
        ProdutoProvider.getByNameAndSize(
            { nome, tamanho },
            this.productExistsCallback,
            this.productDoesNotExistCallback,
            this.errorCallback
        )
    }
    deleteProduct = (event) => {
        event.preventDefault()
        event.stopPropagation()
        ProdutoProvider.delete(this.state.id)
    }

    submit = (event) => {
        event.preventDefault()
        event.stopPropagation()
        ProdutoProvider.createOrUpdate(this.state)
    }

    render() {
        return (
            <ProductForm id='product-form' onSubmit={this.submit}>
                <BaseFormTitle title='Produto' />
                <BaseLabel htmlFor={FORM_INPUT_IDS.NOME}>NOME</BaseLabel>
                <BaseInput
                    id={FORM_INPUT_IDS.NOME}
                    name={FORM_INPUT_IDS.NOME}
                    noValidation
                    onChange={this.handleChangeInput}
                    // onBlur={this.getProduct}
                    value={this.state[FORM_INPUT_IDS.NOME]}
                    disabled={this.state.isLocked}
                />
                <BaseLabel htmlFor={FORM_INPUT_IDS.TAMANHO}>TAMANHO</BaseLabel>
                <BaseSelect
                    form='product-form'
                    name='tamanho'
                    options={sizes}
                    onChange={this.handleChangeInput}
                    disabled={this.state.isLocked || !this.state[FORM_INPUT_IDS.NOME]}
                    value={this.state[FORM_INPUT_IDS.TAMANHO]}
                    placeholderMessage='Escolha a tamanho'
                    onBlur={this.getProduct}
                />
                <BaseLabel htmlFor={FORM_INPUT_IDS.VALOR}>VALOR</BaseLabel>
                <BaseInput
                    id={FORM_INPUT_IDS.VALOR}
                    name={FORM_INPUT_IDS.VALOR}
                    noValidation
                    onChange={this.handleChangeInput}
                    value={this.state[FORM_INPUT_IDS.VALOR]}
                    type='number'
                    min={0}
                    step={0.01}
                    disabled={this.state.isLocked}
                />
                {
                    this.state[FORM_INPUT_IDS.TAMANHO] && this.state[FORM_INPUT_IDS.TAMANHO] !== 'Único' &&
                    <React.Fragment>
                        <BaseLabel>Insumos</BaseLabel>
                        {this.state.supplyList.map((supply, index) => {
                            const isChecked = this.isChecked(supply)
                            const qtd = isChecked ? this.getSupplyQuantity(supply) : ''
                            return (<CheckBoxContainer key={`${supply}-${index}`}>
                                <Checkbox type='checkbox' checked={isChecked} onChange={() => { this.handleCheckClick(supply) }} />
                                <CheckBoxLabel>{supply.descricao}</CheckBoxLabel>
                                <BaseInput
                                    noValidation
                                    type='number'
                                    min={1}
                                    disabled={this.state.isLocked || !isChecked}
                                    value={qtd}
                                    onChange={(event) => this.handleQtdChange(supply, event.target.value)}
                                />
                            </CheckBoxContainer>)
                        })}
                    </React.Fragment>
                }
                <Message>{this.state.message}</Message>
                {
                    this.state.isNewProduct
                        ? (<BaseButton
                            type='submit'
                        >
                            Cadastrar
                        </BaseButton>)
                        : (<ButtonsContainer>
                            <BaseButton
                                type='submit'
                            >
                                Atualizar
                        </BaseButton>
                            <BaseButton
                                onClick={this.deleteProduct}
                            >
                                Deletar
                        </BaseButton>
                        </ButtonsContainer>)
                }
            </ProductForm>
        )
    }

}
