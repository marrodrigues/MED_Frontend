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
const sizes = ['Brotinho', 'Média', 'Grande', 'Gigante', 'Único']

export default class extends React.Component {
//     {
//         "nome": "4 Queijos",
//         "tamanho": "Media",
//         "valor": 12,
//         "lote": null,
//         "validade": null,
//         "insumos": [
//             {
//                 "id": 12,
//                 "qtd": 3
//             }
//         ]
// }
    state = {
        [FORM_INPUT_IDS.NOME]: '',
        [FORM_INPUT_IDS.TAMANHO]: '',
        [FORM_INPUT_IDS.VALOR]: '',
        id: null,
        supplyList: [],
        insumos: [],
        isLocked: false,
        isNewProduct: true,
        message: '',
    }
    componentDidMount() {
        InsumoProvider.getAll((supplyList) => {this.setState({supplyList})})
    }
    handleChangeInput = (event) => {
        this.setState({ [event.target.name]: event.target.value })
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
                    onBlur={this.getProduct}
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
                <Message>{this.state.message}</Message>
                {
                    this.state.isNewProduct
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
