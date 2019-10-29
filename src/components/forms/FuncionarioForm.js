import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { BaseForm, InputWithLabel } from '../base'
import { ButtonOrSpinner } from '../base/button'
import { setLoading, setNotLoading } from '../../actions'
import InputRow from '../base/form/InputRow'
import { PESSOA_DEFAULT_VALUE } from '../../util/constants'


const FuncionarioForm = ({ selectedEmployee: initial, setIsLoading, setIsNotLoading, loading, ...props }) => {
    const [selectedEmployee, setselectedEmployee] = useState(initial || PESSOA_DEFAULT_VALUE)
    useEffect(() => {
        setselectedEmployee(selectedEmployee)
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
    const [cargo, setCargo] = useState(selectedEmployee.cargo || '')
    const [errors, setErrors] = useState({})
    return (
        <BaseForm key='funcionario-form' id='funcionario-form' {...props} >
            <InputRow>
                <InputWithLabel
                    label='Nome'
                    value={nome}
                    onChange={setNome}
                    isInvalid={Boolean(errors.nome)}
                />
                <InputWithLabel
                    label='Email'
                    value={email}
                    onChange={setEmail}
                    type='email'
                    isInvalid={Boolean(errors.email)}
                />
            </InputRow>
            <InputRow>
                <InputWithLabel
                    label='CPF'
                    value={cpf}
                    onChange={setCpf}
                    isInvalid={Boolean(errors.cpf)}
                    maxLength={11}
                />
                <InputWithLabel
                    label='Login'
                    value={login}
                    onChange={setLogin}
                    isInvalid={Boolean(errors.login)}
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
                <InputWithLabel
                    label='Telefone'
                    value={numero_telefone}
                    onChange={setTelefone}
                    isInvalid={Boolean(errors.telefone)}
                    width='250px'
                />
                <InputWithLabel
                    label='Cargo'
                    width='150px'
                    value={cargo}
                    onChange={setCargo}
                />
            </InputRow>
            <InputRow>
                <InputWithLabel
                    label='CEP'
                    value={CEP}
                    onChange={setCEP}
                    isInvalid={Boolean(errors.CEP)}
                    maxLength={9}
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
            <ButtonOrSpinner label='Atualizar' />
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