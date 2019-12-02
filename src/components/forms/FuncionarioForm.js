import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import {
    BaseForm,
    CepInputWithLabel,
    CpfInputWithLabel,
    EmailInputWithLabel,
    InputWithLabel,
    LoginInputWithLabel
} from '../base'
import { ButtonOrSpinner } from '../base/button'
import { setLoading, setNotLoading } from '../../actions'
import InputRow from '../base/form/InputRow'
import {PESSOA_DEFAULT_VALUE, reloadWindow, ROLES, TIPOS_PRODUTO} from '../../util/constants'
import PhoneInputWithLabel from "../base/input/PhoneInputWithLabel";
import Select from "../select";
import {ClienteProvider, FuncionarioProvider} from "../../providers";


const FuncionarioForm = ({ selectedEmployee: initial, setIsLoading, setIsNotLoading, loading, ...props }) => {
    const [selectedEmployee, setSelectedEmployee] = useState(initial || PESSOA_DEFAULT_VALUE)
    useEffect(() => {
        setSelectedEmployee(selectedEmployee)
    }, [selectedEmployee])
    const [nome, setNome] = useState(selectedEmployee.pessoa.nome || '')
    const [email, setEmail] = useState(selectedEmployee.pessoa.email || '')
    const [cpf, setCpf] = useState(selectedEmployee.pessoa.cpf || '')
    const [login, setLogin] = useState(selectedEmployee.pessoa.login || '')
    const [dataNascimento, setDataNascimento] = useState(selectedEmployee.pessoa.dataNascimento || '')
    const [numero_telefone, setTelefone] = useState(selectedEmployee.pessoa.telefone[0].numero_telefone || '')
    const [CEP, setCEP] = useState(selectedEmployee.pessoa.endereco[0].CEP || '')
    const [logradouro, setLogradouro] = useState(selectedEmployee.pessoa.endereco[0].logradouro || '')
    const [numero, setNumero] = useState(selectedEmployee.pessoa.endereco[0].numero || '')
    const [complemento, setComplemento] = useState(selectedEmployee.pessoa.endereco[0].complemento || '')
    const [bairro, setBairro] = useState(selectedEmployee.pessoa.endereco[0].bairro || '')
    const [cidade, setCidade] = useState(selectedEmployee.pessoa.endereco[0].cidade || '')
    const [uf, setUf] = useState(selectedEmployee.pessoa.endereco[0].UF || '')
    const [cargo, setCargo] = useState(selectedEmployee.cargo || ROLES[0].value)
    const [errors, setErrors] = useState({})
    const notFoundCallback = () => {
        return [false, '']
    }
    const emailFoundCallback = () => {
        return [true, 'E-mail já cadastrado']
    }
    const loginFoundCallback = () => {
        return [true, 'Login já cadastrado']
    }
    const cpfFoundCallback = () => {
        return [true, 'CPF já cadastrado']
    }
    const validateInputs = () => {
        let errors = {}
        if (!nome) errors.nome = true
        if (!email) errors.email = true
        if (!cpf) errors.cpf = true
        if (!login) errors.login = true
        if (!dataNascimento) errors.dataNascimento = true
        if (!numero_telefone) errors.telefone = true
        if (!CEP) errors.CEP = true
        if (!numero) errors.numero = true
        setErrors(errors)
    }
    const onChangeCargo = event => {
        setCargo(event.target.value)
    }
    const validCepCallback = (data) => {
        const {
            bairro: _bairro,
            localidade,
            logradouro: _logradouro,
            uf: _uf
        } = data
        setBairro(_bairro)
        setCidade(localidade)
        setLogradouro(_logradouro)
        setUf(_uf)
    }
    const onSubmit = e => {
        setIsLoading()
        e.preventDefault()
        e.stopPropagation()
        validateInputs()
        if (Object.values(errors).some(field => field)) {
            setIsNotLoading()
            return
        }
        FuncionarioProvider.createOrUpdate(
            {...selectedEmployee, nome, email, cpf, login, dataNascimento, numero_telefone, CEP, numero, complemento, logradouro, bairro, cidade, uf, senha: selectedEmployee.pessoa.senha || 'senha1', cargo},
            reloadWindow)
    }

    return (
        <BaseForm key='funcionario-form' id='funcionario-form' {...props} onSubmit={onSubmit}>
            <InputRow>
                <InputWithLabel
                    label='Nome'
                    value={nome}
                    onChange={setNome}
                    isInvalid={Boolean(errors.nome)}
                />
                <EmailInputWithLabel
                    value={email}
                    onChange={setEmail}
                    isInvalid={Boolean(errors.email)}
                    emailExistsCallback={emailFoundCallback}
                    emailNotFoundCallback={notFoundCallback}
                />
            </InputRow>
            <InputRow>
                <CpfInputWithLabel
                    value={cpf}
                    onChange={setCpf}
                    isInvalid={Boolean(errors.cpf)}
                    cpfNotFoundCallback={notFoundCallback}
                    cpfExistsCallback={cpfFoundCallback}
                />
                <LoginInputWithLabel
                    value={login}
                    onChange={setLogin}
                    isInvalid={Boolean(errors.login)}
                    loginNotFoundCallback={notFoundCallback}
                    loginExistsCallback={loginFoundCallback}
                />
            </InputRow>
            <InputRow>
                <InputWithLabel
                    label='Data de Nascimento'
                    value={dataNascimento}
                    onChange={setDataNascimento}
                    type='date'
                    isInvalid={Boolean(errors.dataNascimento)}
                    width='250px'
                />
                <PhoneInputWithLabel
                    value={numero_telefone}
                    onChange={setTelefone}
                    isInvalid={Boolean(errors.telefone)}
                    width={'200px'}
                />
                <Select
                    label='Cargo'
                    objectList={ROLES}
                    fieldForValue={'value'}
                    fieldForLabel={'label'}
                    onChangeValue={onChangeCargo}
                    value={cargo}
                    // width='150px'
                />
            </InputRow>
            <InputRow>
                <CepInputWithLabel
                    value={CEP}
                    onChange={setCEP}
                    isInvalid={Boolean(errors.CEP)}
                    validCepCallback={validCepCallback}
                />
                <InputWithLabel
                    label='Logradouro'
                    value={logradouro}
                    onChange={setLogradouro}
                    // isInvalid={Boolean(errors.logradouro)}
                    disabled
                />
            </InputRow>
            <InputRow>
                <InputWithLabel
                    label='Número da residência'
                    value={numero}
                    onChange={setNumero}
                    isInvalid={Boolean(errors.numero)}
                    width='140px'
                />
                <InputWithLabel
                    label='Complemento'
                    value={complemento}
                    onChange={setComplemento}
                    isInvalid={Boolean(errors.complemento)}
                    width='185px'
                />
                <InputWithLabel
                    label='Bairro'
                    value={bairro}
                    onChange={setBairro}
                    // isInvalid={Boolean(errors.bairro)}
                    disabled
                    width='250px'
                />
            </InputRow>
            <InputRow>
                <InputWithLabel
                    label='Cidade'
                    value={cidade}
                    onChange={setCidade}
                    // isInvalid={Boolean(errors.cidade)}
                    disabled
                />
                <InputWithLabel
                    label='UF'
                    value={uf}
                    onChange={setUf}
                    // isInvalid={Boolean(errors.uf)}
                    disabled
                />
            </InputRow>
            <ButtonOrSpinner label={selectedEmployee.id ? 'Atualizar' : 'Cadastrar'} />
        </BaseForm>
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

export default connect(mapStateToProps, mapDispatchToProps)(FuncionarioForm)