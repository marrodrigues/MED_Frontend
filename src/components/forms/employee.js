// {
//     "cargo": "Admin",
//     "pessoa":{
// 		"cpf": "89382723623",
// 	    "nome": "Matheus Correa",
// 	    "login": "mc_da20",
// 	    "senha": "teste",
// 	    "email": "mc_da20@gmail.com",
// 	    "dataNascimento": "1990-11-03"	,
// 	    "endereco":[{
// 	    	"logradouro": "Rua Canelinha",
// 	    	"numero": "71",
// 	    	"CEP": "22710560",
// 	    	"bairro": "Curicica"
// 	    }],
// 	    "telefone":[{
// 	    	"numero_telefone": "99223-0022",
// 	    	"tipo": "celular"
// 	    }]
//     }
// }

import React from 'react'
import styled from 'styled-components'
import FuncionarioProvider from '../../providers/funcionario'

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

const EmployeeForm = styled.form`
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
const roles = ['Admin', 'Funcionario']

export default class extends React.Component {
    state = {
        [FORM_INPUT_IDS.CPF]: '',
        [FORM_INPUT_IDS.LOGIN]: '',
        [FORM_INPUT_IDS.EMAIL]: '',
        [FORM_INPUT_IDS.CARGO]: roles[0],
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
        isNewEmployee: true,
        employeeList: [],
        message: '',
    }
    componentDidMount() {
        FuncionarioProvider.getAll((employeeList) => { this.setState({ employeeList }) })
        if (this.props.selectedEmployee && this.props.selectedEmployee.id) { 
            debugger
            this.setState({
                ...this.props.selectedEmployee.pessoa.endereco[0],
                ...this.props.selectedEmployee.pessoa.telefone[0],
                ...this.props.selectedEmployee.pessoa,
                cargo: this.props.selectedEmployee.cargo,
                isNewEmployee: false,
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
            isNewEmployee: true,
            message: '',
        })
    }
    setMessage = (message) => {
        this.setState({ message })
        setTimeout(() => { this.setState({ message: '' }) }, 3000)
    }
    employeeExistsCallback = (employee) => {
        const fullEmployee = this.state.employeeList.find(_employee => _employee.pessoa.id === employee.id)
        // debugger
        this.setState({
            ...employee.endereco[0],
            ...employee.telefone[0],
            ...employee,
            cargo: fullEmployee.cargo,
            isNewEmployee: false,
            isLocked: false
        })
        console.log(this.state);
        
        this.setMessage('Funcionario encontrado')
    }
    employeeDoesNotExistCallback = () => {
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
    deleteEmployee = (event) => {
        event.preventDefault()
        event.stopPropagation()
        FuncionarioProvider.delete(this.state.employeeList.find(employee => employee.pessoa.id === this.state.id).id)
    }
    submit = (event) => {
        event.preventDefault()
        event.stopPropagation()
        if (this.state.isNewEmployee) {
            FuncionarioProvider.createOrUpdate(this.state)
        } else {
            const fullEmployee = this.state.employeeList.find(employee => employee.pessoa.id === this.state.id)
            FuncionarioProvider.createOrUpdate({...this.state, id: fullEmployee.id, pessoaId: this.state.id})
        }
    }

    render() {
        return (
            <EmployeeForm id='employee-form' onSubmit={this.submit}>
                <BaseFormTitle title='Funcionario' />
                <EmailInput
                    onChange={this.handleChangeInput}
                    value={this.state[FORM_INPUT_IDS.EMAIL] || ''}
                    disabled={this.state.isLocked}
                    lockForm={this.lockForm}
                    existsCallback={this.employeeExistsCallback}
                    doesNotExistCallback={this.employeeDoesNotExistCallback}
                    errorCallback={this.errorCallback}
                    noValidation
                />
                <LoginInput
                    onChange={this.handleChangeInput}
                    value={this.state[FORM_INPUT_IDS.LOGIN] || ''}
                    disabled={this.state.isLocked}
                    lockForm={this.lockForm}
                    existsCallback={this.employeeExistsCallback}
                    doesNotExistCallback={this.employeeDoesNotExistCallback}
                    errorCallback={this.errorCallback}
                    noValidation
                />
                <CPFInput
                    onChange={this.handleChangeInput}
                    value={this.state[FORM_INPUT_IDS.CPF] || ''}
                    disabled={this.state.isLocked}
                    lockForm={this.lockForm}
                    existsCallback={this.employeeExistsCallback}
                    doesNotExistCallback={this.employeeDoesNotExistCallback}
                    errorCallback={this.errorCallback}
                    noValidation
                />
                <BaseLabel htmlFor={FORM_INPUT_IDS.CARGO}>CARGO</BaseLabel>
                <BaseSelect
                    form='product-form'
                    name={FORM_INPUT_IDS.CARGO}
                    options={roles}
                    onChange={this.handleChangeInput}
                    disabled={this.state.isLocked}
                    value={this.state[FORM_INPUT_IDS.CARGO]}
                    placeholderMessage='Escolha a tamanho'
                    onBlur={this.getProduct}
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
                    this.state.isNewEmployee
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
                                onClick={this.deleteEmployee}
                            >
                                Deletar
                        </BaseButton>
                        </ButtonsContainer>)
                }
            </EmployeeForm>
        )
    }
}