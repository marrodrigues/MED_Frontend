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

const BundleForm = styled.form`
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

export default class extends React.Component {
    state = {
        [FORM_INPUT_IDS.LOTE]: '',
        [FORM_INPUT_IDS.VALIDADE]: '',
        [FORM_INPUT_IDS.QUANTIDADE]: '',
        productList: [],
        supplyList: [],
        productOrSupplyValue: '',
        productOrSupplyObject: {},
        productOrSupply: '',
        id: null,
        produtoId: null,
        insumoId: null,
        isLocked: false,
        isNewBundle: true,
        message: '',
    }
    componentDidMount() {
        InsumoProvider.getAll((supplyList) => {this.setState({supplyList})})
        ProdutoProvider.getAll((productList) => {this.setState({productList})})
        if (this.props.selectedBundle && this.props.selectedBundle.id) {
            // debugger
            // this.bundleExistsCallback(this.props.selectedBundle)
            const productOrSupply = 
                this.props.selectedBundle.insumoId
                ? 'Insumo'
                : this.props.selectedBundle.produtoId
                ? 'Produto'
                : ''
            // const productOrSupplyValue = 
            //     productOrSupply === 'Insumo'
            //     ? this.state.supplyList.find(supply => supply.id === this.props.selectedBundle.insumoId).descricao
            //     : productOrSupply === 'Produto'
            //     ? this.state.productList.find(product => product.id === this.props.selectedBundle.produtoId)
            //     : ''
            this.setState({
                ...this.props.selectedBundle,
                productOrSupply,
                // productOrSupplyValue,
                isNewBundle: false,
            })
        }
    }
    handleChangeInput = (event) => {
        if (event.target.name === 'productOrSupplyObject') {
            let productOrSupplyObject = {}
            let produtoId = null
            let insumoId = null
            if (this.state.productOrSupply === 'Insumo') {
                productOrSupplyObject = this.state.supplyList.find(supply => supply.descricao === event.target.value)
                insumoId = productOrSupplyObject.id
            } else {
                productOrSupplyObject = this.state.productList.find(product => product.nome === event.target.value)
                produtoId = productOrSupplyObject.id
            }
            // debugger
            this.setState({
                [event.target.name]: event.target.value,
                productOrSupplyObject,
                produtoId,
                insumoId
            })
        } else {
            this.setState({ [event.target.name]: event.target.value })
        }
    }
    clearInputs = () => {
        this.setState({
            isNewBundle: true,
            isLocked: false,
            [FORM_INPUT_IDS.VALIDADE]: '',
            [FORM_INPUT_IDS.QUANTIDADE]: '',
            productOrSupply: '',
            productOrSupplyObject: {},
            id: null,
            produtoId: null,
            insumoId: null,
        })
    }
    setMessage = (message) => {
        this.setState({message})
        setTimeout(() => { this.setState({message: ''}) }, 3000) 
    }
    bundleExistsCallback = (bundle) => {
        // // debugger
        let productOrSupplyObject = {}
        let productOrSupply = ''
        if (bundle.insumoId) {
            productOrSupply = 'Insumo'
            productOrSupplyObject = this.state.supplyList.find(supply => supply.id === bundle.insumoId) || {}
        }
        if (bundle.produtoId) {
            productOrSupply = 'Produto'
            productOrSupplyObject = this.state.productList.find(product => product.id === bundle.produtoId) || {}
        }
        this.setState({
            isNewBundle: false,
            isLocked: false,
            productOrSupply,
            productOrSupplyObject,
            ...bundle,
        })
        this.setMessage('Lote encontrado')
    }
    bundleDoesNotExistCallback = () => {
        this.clearInputs()
    }
    errorCallback = () => {
        this.setMessage('Erro inesperado')
        setTimeout(() => { window.location.reload() }, 1000)
    }
    getBundle = (event) => {
        this.setState({ isLocked: true })
        const lote = event.target.value
        console.log(lote)
        // // debugger
        LoteProvider.getByBundle(
            lote,
            this.bundleExistsCallback,
            this.bundleDoesNotExistCallback,
            this.errorCallback
        )
    }
    deleteBundle = (event) => {
        event.preventDefault()
        event.stopPropagation()
        LoteProvider.delete(this.state.id)
    }
    submit = (event) => {
        event.preventDefault()
        event.stopPropagation()
        LoteProvider.createOrUpdate(this.state)
    }

    render() {
        const options = 
            this.state.productOrSupply === 'Produto'
            ? this.state.productList.map(product => product.nome)
            : this.state.productOrSupply === 'Insumo' 
            ? this.state.supplyList.map(supply => supply.descricao)
            : []
        const selectedOption = this.state.productOrSupplyObject.nome || this.state.productOrSupplyObject.descricao
        console.log('>>>>>', selectedOption);
        console.log(this.state)
        
        const label = this.state.productOrSupply
        return (
            <BundleForm id='bundle-form' onSubmit={this.submit}>
                <BaseFormTitle title='Lote' />
                <BaseLabel htmlFor={FORM_INPUT_IDS.LOTE}>LOTE</BaseLabel>
                <BaseInput
                    id={FORM_INPUT_IDS.LOTE}
                    name={FORM_INPUT_IDS.LOTE}
                    noValidation
                    onChange={this.handleChangeInput}
                    onBlur={this.getBundle}
                    value={this.state[FORM_INPUT_IDS.LOTE]}
                    disabled={this.state.isLocked}
                />
                <BaseLabel htmlFor={FORM_INPUT_IDS.VALIDADE}>VALIDADE</BaseLabel>
                <BaseInput
                    id={FORM_INPUT_IDS.VALIDADE}
                    name={FORM_INPUT_IDS.VALIDADE}
                    noValidation
                    onChange={this.handleChangeInput}
                    value={this.state[FORM_INPUT_IDS.VALIDADE]}
                    type='date'
                    disabled={this.state.isLocked}
                />
                <BaseLabel htmlFor={FORM_INPUT_IDS.QUANTIDADE}>QUANTIDADE</BaseLabel>
                <BaseInput
                    id={FORM_INPUT_IDS.QUANTIDADE}
                    name={FORM_INPUT_IDS.QUANTIDADE}
                    noValidation
                    onChange={this.handleChangeInput}
                    value={this.state[FORM_INPUT_IDS.QUANTIDADE]}
                    type='number'
                    min={1}
                    disabled={this.state.isLocked}
                />
                <RadioContainer>
                    <BaseRadio 
                        name='productOrSupply'
                        value='Insumo'
                        checked={this.state.productOrSupply === 'Insumo'}
                        onClick={this.handleChangeInput}
                    /> 
                    <BaseRadio 
                        name='productOrSupply'
                        value='Produto'
                        checked={this.state.productOrSupply === 'Produto'}
                        onClick={this.handleChangeInput}
                    />
                </RadioContainer>
                {label && <BaseLabel htmlFor='productOrSupply'>{label}</BaseLabel>}
                <BaseSelect 
                    form='bundle-form'
                    name='productOrSupplyObject'
                    options={options}
                    onChange={this.handleChangeInput}
                    disabled={this.state.isLocked || !this.state.productOrSupply}
                    value={this.state.productOrSupplyValue}
                />
                <Message>{this.state.message}</Message>
                {
                    this.state.isNewBundle
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
                            onClick={this.deleteBundle}
                        >
                            Deletar
                        </BaseButton>
                    </ButtonsContainer>)
                }
            </BundleForm>
        )
    }
}