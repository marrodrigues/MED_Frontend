import React from 'react'
import styled from 'styled-components'
import ClienteProvider from '../../providers/cliente'

import BaseFormTitle from '../base/form-title'
import BaseLabel from '../base/label'
import BaseInput from '../base/input'
import BaseSelect from '../base/select'
import BaseButton from '../base/button'
import CEPInput from '../inputs/cep-input'
import EmailInput from '../inputs/email'
import LoginInput from '../inputs/login'
import CPFInput from '../inputs/cpf'

import { FORM_INPUT_IDS } from '../../util/constants'

const ClientForm = styled.form`
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
// const roles = ['cliente', 'funcionário', 'admin']

export default class extends React.Component {
    state = {
        [FORM_INPUT_IDS.CPF]: '',
        [FORM_INPUT_IDS.LOGIN]: '',
        [FORM_INPUT_IDS.EMAIL]: '',
        [FORM_INPUT_IDS.NOME]: '',
        [FORM_INPUT_IDS.SENHA]: '',
        [FORM_INPUT_IDS.NASCIMENTO]: '',
        [FORM_INPUT_IDS.CEP]: '',
        [FORM_INPUT_IDS.NUMERO]: '',
        [FORM_INPUT_IDS.COMPLEMENTO]: '',
        [FORM_INPUT_IDS.BAIRRO]: '',
        [FORM_INPUT_IDS.UF]: '',
        [FORM_INPUT_IDS.CIDADE]: '',
        [FORM_INPUT_IDS.TELEFONE]: '',
        id: null,
        isLocked: false,
        isNewClient: true,
        clientList: [],
        message: '',
    }
    componentDidMount() {
        ClienteProvider.getAll((clientList) => { this.setState({ clientList }) })
        if (this.props.selectedClient && this.props.selectedClient.id) { 
            this.setState({
                ...this.props.selectedClient.pessoa.endereco[0],
                ...this.props.selectedClient.pessoa.telefone[0],
                ...this.props.selectedClient.pessoa
            })
        }
    }
    handleChangeInput = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }
    clearInputs = () => {
        this.setState({
            [FORM_INPUT_IDS.NOME]: '',
            [FORM_INPUT_IDS.SENHA]: '',
            [FORM_INPUT_IDS.NASCIMENTO]: '',
            [FORM_INPUT_IDS.CEP]: '',
            [FORM_INPUT_IDS.LOGRADOURO]: '',
            [FORM_INPUT_IDS.NUMERO]: '',
            [FORM_INPUT_IDS.COMPLEMENTO]: '',
            [FORM_INPUT_IDS.BAIRRO]: '',
            [FORM_INPUT_IDS.UF]: '',
            [FORM_INPUT_IDS.CIDADE]: '',
            [FORM_INPUT_IDS.TELEFONE]: '',
            id: null,
            isLocked: false,
            isNewClient: true,
            message: '',
        })
    }
    setMessage = (message) => {
        this.setState({ message })
        setTimeout(() => { this.setState({ message: '' }) }, 3000)
    }
    clientExistsCallback = (client) => {
        // debugger
        this.setState({
            ...client.endereco[0],
            ...client.telefone[0],
            ...client,
            isNewClient: false,
            isLocked: false
        })
        console.log(this.state);
        
        this.setMessage('Cliente encontrado')
    }
    clientDoesNotExistCallback = () => {
        this.clearInputs()
    }
    errorCallback = () => {
        this.setMessage('Erro inesperado')
        setTimeout(() => { window.location.reload() }, 1000)
    }
    lockForm = () => {
        this.setState({ isLocked: true })
    }
    cepCallback = (data) => {
        this.setState({ ...data })
    }
    deleteClient = (event) => {
        event.preventDefault()
        event.stopPropagation()
        ClienteProvider.delete(this.state.clientList.find(client => client.pessoa.id === this.state.id).id)
    }
    submit = (event) => {
        event.preventDefault()
        event.stopPropagation()
        if (this.state.isNewClient) {
            ClienteProvider.createOrUpdate(this.state)
        } else {
            const fullClient = this.state.clientList.find(client => client.pessoa.id === this.state.id)
            ClienteProvider.createOrUpdate({...this.state, id: fullClient.id, pessoaId: this.state.id})
        }
    }

    render() {
        return (
            <ClientForm id='client-form' onSubmit={this.submit}>
                <BaseFormTitle title='Cliente' />
                <EmailInput
                    onChange={this.handleChangeInput}
                    value={this.state[FORM_INPUT_IDS.EMAIL] || ''}
                    disabled={this.state.isLocked}
                    lockForm={this.lockForm}
                    existsCallback={this.clientExistsCallback}
                    doesNotExistCallback={this.clientDoesNotExistCallback}
                    errorCallback={this.errorCallback}
                    noValidation
                />
                <LoginInput
                    onChange={this.handleChangeInput}
                    value={this.state[FORM_INPUT_IDS.LOGIN] || ''}
                    disabled={this.state.isLocked}
                    lockForm={this.lockForm}
                    existsCallback={this.clientExistsCallback}
                    doesNotExistCallback={this.clientDoesNotExistCallback}
                    errorCallback={this.errorCallback}
                    noValidation
                />
                <CPFInput
                    onChange={this.handleChangeInput}
                    value={this.state[FORM_INPUT_IDS.CPF] || ''}
                    disabled={this.state.isLocked}
                    lockForm={this.lockForm}
                    existsCallback={this.clientExistsCallback}
                    doesNotExistCallback={this.clientDoesNotExistCallback}
                    errorCallback={this.errorCallback}
                    noValidation
                />
                <BaseLabel htmlFor={FORM_INPUT_IDS.NOME}>NOME</BaseLabel>
                <BaseInput
                    id={FORM_INPUT_IDS.NOME}
                    name={FORM_INPUT_IDS.NOME}
                    noValidation
                    onChange={this.handleChangeInput}
                    value={this.state[FORM_INPUT_IDS.NOME] || ''}
                    disabled={this.state.isLocked}
                />
                <BaseLabel htmlFor={FORM_INPUT_IDS.TELEFONE}>TELEFONE</BaseLabel>
                <BaseInput
                    id={FORM_INPUT_IDS.TELEFONE}
                    name={FORM_INPUT_IDS.TELEFONE}
                    noValidation
                    onChange={this.handleChangeInput}
                    value={this.state[FORM_INPUT_IDS.TELEFONE] || ''}
                    disabled={this.state.isLocked}
                />

                <BaseLabel htmlFor={FORM_INPUT_IDS.SENHA}>SENHA</BaseLabel>
                <BaseInput
                    id={FORM_INPUT_IDS.SENHA}
                    name={FORM_INPUT_IDS.SENHA}
                    noValidation
                    onChange={this.handleChangeInput}
                    value={this.state[FORM_INPUT_IDS.SENHA] || ''}
                    disabled={this.state.isLocked}
                    type='password'
                />
                <BaseLabel htmlFor={FORM_INPUT_IDS.NASCIMENTO}>NASCIMENTO</BaseLabel>
                <BaseInput
                    id={FORM_INPUT_IDS.NASCIMENTO}
                    name={FORM_INPUT_IDS.NASCIMENTO}
                    noValidation
                    type='date'
                    onChange={this.handleChangeInput}
                    value={this.state[FORM_INPUT_IDS.NASCIMENTO] || ''}
                    disabled={this.state.isLocked}
                />
                <CEPInput
                    onChange={this.handleChangeInput}
                    value={this.state[FORM_INPUT_IDS.CEP] || ''}
                    successCallback={this.cepCallback}
                    disabled={this.state.isLocked}
                    numeroValue={this.state[FORM_INPUT_IDS.NUMERO] || ''}
                    logradouroValue={this.state[FORM_INPUT_IDS.LOGRADOURO] || ''}
                    complementoValue={this.state[FORM_INPUT_IDS.COMPLEMENTO] || ''}
                    bairroValue={this.state[FORM_INPUT_IDS.BAIRRO] || ''}
                    ufValue={this.state[FORM_INPUT_IDS.UF] || ''}
                    cidadeValue={this.state[FORM_INPUT_IDS.CIDADE] || ''}
                />

                <Message>{this.state.message}</Message>
                {
                    this.state.isNewClient
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
                                onClick={this.deleteClient}
                            >
                                Deletar
                        </BaseButton>
                        </ButtonsContainer>)
                }
            </ClientForm>
        )
    }
}