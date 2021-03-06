// dependencies
import React from 'react'
import styled from 'styled-components'

// components
import BaseInput from '../../base/new/input'
import BaseForm from '../../base/new/form'
import BaseButton from '../../base/new/button'

import Spinner from 'react-spinkit'

import UserProvider from '../../../providers/user'
import ClientProvider from '../../../providers/cliente'
import { formatCep } from '../../../util/string'
import { ALLOWED_CITY, ALLOWED_DISTRICTS, FORM_INPUT_IDS } from '../../../util/constants'
import config from '../../../config'
import axios from 'axios'

const RegisterForm = styled(BaseForm)`
    width: 640px;
    align-items: center;
    padding: 1vh 5vw;
`
const InputRow = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    padding: 5px 0;
    &.last-row {
        padding-bottom: 30px;
    }
`
const FormTitle = styled.h1`
    color: #425A15;
`

export default class extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            [FORM_INPUT_IDS.BAIRRO]: '',
            [FORM_INPUT_IDS.CEP]: '',
            [FORM_INPUT_IDS.CPF]: '',
            [FORM_INPUT_IDS.EMAIL]: '',
            [FORM_INPUT_IDS.LOGIN]: '',
            [FORM_INPUT_IDS.LOGRADOURO]: '',
            [FORM_INPUT_IDS.NASCIMENTO]: '',
            [FORM_INPUT_IDS.NOME]: '',
            [FORM_INPUT_IDS.NUMERO]: '',
            [FORM_INPUT_IDS.SENHA]: '',
            [FORM_INPUT_IDS.TELEFONE]: '',
            [FORM_INPUT_IDS.UF]: '',
            [`${FORM_INPUT_IDS.SENHA}-confirm`]:'',
            ...this.getPreRegisterValues()
        }
    }
    setClient = (client) => {
        let { state } = this
        state[FORM_INPUT_IDS.BAIRRO]= client.pessoa.endereco[0].bairro
        state[FORM_INPUT_IDS.CEP]= client.pessoa.endereco[0].CEP
        state[FORM_INPUT_IDS.CPF]= client.pessoa.cpf
        state[FORM_INPUT_IDS.EMAIL]= client.pessoa.email
        state[FORM_INPUT_IDS.LOGIN]= client.pessoa.login
        state[FORM_INPUT_IDS.LOGRADOURO]= client.pessoa.endereco[0].logradouro
        state[FORM_INPUT_IDS.COMPLEMENTO]= client.pessoa.endereco[0].COMPLEMENTO
        state[FORM_INPUT_IDS.NASCIMENTO]= client.pessoa.dataNascimento
        state[FORM_INPUT_IDS.NOME]= client.pessoa.nome
        state[FORM_INPUT_IDS.NUMERO]= client.pessoa.endereco[0].numero
        state[FORM_INPUT_IDS.SENHA]= client.pessoa.senha
        state[FORM_INPUT_IDS.TELEFONE]= client.pessoa.telefone[0].numero_telefone
        state[FORM_INPUT_IDS.UF]= client.pessoa.endereco[0].UF
        state.id = client.id
        state.pessoaId = client.pessoaId
        this.setState({...state})
    }

    componentDidMount() {
        if (this.props.selectedClient && this.props.selectedClient.pessoa) {
            this.setClient(this.props.selectedClient)
        } else if(this.props.update) {
            ClientProvider.getAll((clients) => {
                const client = clients.find(client => client.pessoa.login === this.state.login)
                if (client) {
                    this.setClient(client)
                }
            })
        }
    }

    getPreRegisterValues() {
        if (window.location.search) {
            let fromQS = window.location.search
                .replace('?', '')
                .split('&')
                .reduce((acc, cur) => {
                    const keyAndValue = cur.split('=')
                    acc[keyAndValue[0]] = keyAndValue[1]
                    return acc
                }, {})
            if (fromQS.CEP) {
                this.handleChange({target: {value: fromQS.CEP}})
            }
            return fromQS
        }
        return {}
    }
    checkPasswords = () => {
        if (this.state[`${FORM_INPUT_IDS.SENHA}-confirm`] && 
            !this.state[`${FORM_INPUT_IDS.SENHA}-confirm`] === this.state[FORM_INPUT_IDS.SENHA]){
            this.setState({
                [`${FORM_INPUT_IDS.SENHA}-confirm`]: '',
                [FORM_INPUT_IDS.SENHA]: '',
            })
            alert('As senhas não conferem!')
            // this.setState({loading: false})
            return false
        }
        return true
    }

    submit = (e) => {
        this.setState({loading: true})
        e.preventDefault()
        e.stopPropagation()
        if (!this.checkPasswords){
            this.setState({loading: false})
            return
        }
        if (this.props.update){
            ClientProvider.createOrUpdate(this.state, () => {
                this.setState({loading: false})
            })
        } else {
            UserProvider.create(this.state, () => {
                this.setState({loading: false})
            })
        }
    }

    handleChangeInput = (event) => {
        let currentState = this.state
        currentState[event.target.id] = event.target.value
        if (event.target.id === FORM_INPUT_IDS.CEP) {

        }
        this.setState({ ...currentState })
    }
    handleChange = (event) => {
        const CEP = formatCep(event.target.value)
        this.setState({ CEP })
        if (CEP.length === 9) { this.validateCep(CEP)}
        event.preventDefault && event.preventDefault();
        event.stopPropagation && event.stopPropagation();
    }

    validateCep = (cep) => {
        if (cep.length < 9) { return }

        axios.get(config.VIA_CEP_ENDPOINT + cep + config.VIA_CEP_JSON)
            .then(response => response.data)
            .then(data => {
                // // // debugger
                if (data.erro) {
                    // invalid cep
                    this.setState({isCepValid: false})
                } else {
                    const { logradouro, bairro, localidade, uf } = data
                    const cepObj = { logradouro, bairro, cidade: localidade, uf }
                    this.setState({
                        isCepValid: this.isLocationValid(data), 
                        ...cepObj
                    })
                } 
            })
            .catch(error => { console.log(error) })
    }

    isLocationValid = ({ localidade, bairro }) => {
        return localidade === ALLOWED_CITY && ALLOWED_DISTRICTS.includes(bairro)
    }

    render() {
        return (
            <RegisterForm onSubmit={this.submit}>
                <FormTitle>{this.props.update ? 'Dados cadastrais': 'Criar cadastro'}</FormTitle>
                <InputRow>
                    <BaseInput 
                        id={FORM_INPUT_IDS.NOME}
                        name={FORM_INPUT_IDS.NOME}
                        onChange={this.handleChangeInput}
                        value={this.state[FORM_INPUT_IDS.NOME]}
                        placeholder='Nome'
                    />
                    <BaseInput 
                        id={FORM_INPUT_IDS.EMAIL}
                        name={FORM_INPUT_IDS.EMAIL}
                        onChange={this.handleChangeInput}
                        value={this.state[FORM_INPUT_IDS.EMAIL]}
                        placeholder='E-mail'
                    />
                </InputRow>
                <InputRow>
                    <BaseInput 
                        id={FORM_INPUT_IDS.CPF}
                        name={FORM_INPUT_IDS.CPF}
                        onChange={this.handleChangeInput}
                        value={this.state[FORM_INPUT_IDS.CPF]}
                        placeholder='CPF'
                    />
                    <BaseInput 
                        id={FORM_INPUT_IDS.LOGIN}
                        name={FORM_INPUT_IDS.LOGIN}
                        onChange={this.handleChangeInput}
                        value={this.state[FORM_INPUT_IDS.LOGIN]}
                        placeholder='Login'
                    />
                </InputRow>
                {!this.props.update && 
                <InputRow>
                    <BaseInput 
                        id={FORM_INPUT_IDS.SENHA}
                        name={FORM_INPUT_IDS.SENHA}
                        onChange={this.handleChangeInput}
                        value={this.state[FORM_INPUT_IDS.SENHA]}
                        placeholder='Senha'
                        type='password'
                    />
                    <BaseInput 
                        id={`${FORM_INPUT_IDS.SENHA}-confirm`}
                        name={`${FORM_INPUT_IDS.SENHA}-confirm`}
                        onChange={this.handleChangeInput}
                        value={this.state[`${FORM_INPUT_IDS.SENHA}-confirm`]}
                        placeholder='Confirmação da Senha'
                        type='password'
                    />
                </InputRow>}
                <InputRow>
                    <BaseInput 
                        id={FORM_INPUT_IDS.NASCIMENTO}
                        name={FORM_INPUT_IDS.NASCIMENTO}
                        onChange={this.handleChangeInput}
                        value={this.state[FORM_INPUT_IDS.NASCIMENTO]}
                        placeholder='Nascimento'
                        type='date'
                    />
                    <BaseInput 
                        id={FORM_INPUT_IDS.TELEFONE}
                        name={FORM_INPUT_IDS.TELEFONE}
                        onChange={this.handleChangeInput}
                        value={this.state[FORM_INPUT_IDS.TELEFONE]}
                        placeholder='Telefone'
                    />
                </InputRow>
                <InputRow>
                    <BaseInput 
                        id={FORM_INPUT_IDS.CEP}
                        name={FORM_INPUT_IDS.CEP}
                        onChange={this.handleChange}
                        value={this.state[FORM_INPUT_IDS.CEP]}
                        isValid={this.state.isCepValid}
                        placeholder='CEP'
                    />
                    <BaseInput 
                        id={FORM_INPUT_IDS.LOGRADOURO}
                        name={FORM_INPUT_IDS.LOGRADOURO}
                        onChange={this.handleChangeInput}
                        value={this.state[FORM_INPUT_IDS.LOGRADOURO]}
                        placeholder='Logradouro'
                        disabled
                    />
                </InputRow>
                <InputRow>
                    <BaseInput 
                        id={FORM_INPUT_IDS.NUMERO}
                        name={FORM_INPUT_IDS.NUMERO}
                        onChange={this.handleChangeInput}
                        value={this.state[FORM_INPUT_IDS.NUMERO]}
                        placeholder='Número'
                        type='number'
                        width='140px'
                    />
                    <BaseInput 
                        id={FORM_INPUT_IDS.COMPLEMENTO}
                        name={FORM_INPUT_IDS.COMPLEMENTO}
                        onChange={this.handleChangeInput}
                        value={this.state[FORM_INPUT_IDS.COMPLEMENTO]}
                        placeholder='Complemento'
                        width='185px'
                    />
                    <BaseInput 
                        id={FORM_INPUT_IDS.BAIRRO}
                        name={FORM_INPUT_IDS.BAIRRO}
                        onChange={this.handleChangeInput}
                        value={this.state[FORM_INPUT_IDS.BAIRRO]}
                        placeholder='Bairro'
                        width='250px'
                        disabled
                    />
                </InputRow>
                <InputRow className='last-row'>
                    <BaseInput 
                        id={FORM_INPUT_IDS.CIDADE}
                        name={FORM_INPUT_IDS.CIDADE}
                        onChange={this.handleChangeInput}
                        value={this.state[FORM_INPUT_IDS.CIDADE]}
                        placeholder='Cidade'
                        disabled
                    />
                    <BaseInput 
                        id={FORM_INPUT_IDS.UF}
                        name={FORM_INPUT_IDS.UF}
                        onChange={this.handleChangeInput}
                        value={this.state[FORM_INPUT_IDS.UF]}
                        placeholder='Estado'
                        disabled
                    />
                </InputRow>
                {this.state.loading 
                ? <Spinner name='circle' />
                :<BaseButton
                    type='submit'
                >
                    {this.props.update ? 'Atualizar' : 'Cadastrar'}
                </BaseButton>
                }
            </RegisterForm>
        )
    }
}
