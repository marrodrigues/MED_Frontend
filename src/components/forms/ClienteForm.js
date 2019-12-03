import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import {BaseForm, CepInputWithLabel, CpfInputWithLabel, InputWithLabel} from '../base'
import { validateCep, isLocationValid } from '../../util/validation'
import BaseButton, { ButtonOrSpinner } from '../base/button'
import { setLoading, setNotLoading } from '../../actions'
import InputRow from '../base/form/InputRow'
import {ClienteProvider, UserProvider} from '../../providers'
import {PESSOA_DEFAULT_VALUE, reloadWindow} from '../../util/constants'
import EmailInputWithLabel from "../base/input/EmailInputWithLabel";
import LoginInputWithLabel from "../base/input/LoginInputWithLabel";
import PhoneInputWithLabel from "../base/input/PhoneInputWithLabel";
// import styled from 'styled-components'

const ClienteForm = ({ selectedClient: initial, setIsLoading, setIsNotLoading, loading, clearClient, ...props }) => {
    const [selectedClient, setSelectedClient] = useState(initial || PESSOA_DEFAULT_VALUE)
    useEffect(() => {
        setSelectedClient(initial)
    }, [initial])
    const [nome, setNome] = useState(selectedClient.pessoa.nome || '')
    const [email, setEmail] = useState(selectedClient.pessoa.email || '')
    const [cpf, setCpf] = useState(selectedClient.pessoa.cpf || '')
    const [login, setLogin] = useState(selectedClient.pessoa.login || '')
    const [dataNascimento, setDataNascimento] = useState(selectedClient.pessoa.dataNascimento || '')
    const [numero_telefone, setTelefone] = useState(selectedClient.pessoa.telefone[0].DDD + selectedClient.pessoa.telefone[0].numero_telefone || '')
    const [CEP, setCEP] = useState(selectedClient.pessoa.endereco[0].CEP || '')
    const [logradouro, setLogradouro] = useState(selectedClient.pessoa.endereco[0].logradouro || '')
    const [numero, setNumero] = useState(selectedClient.pessoa.endereco[0].numero || '')
    const [complemento, setComplemento] = useState(selectedClient.pessoa.endereco[0].complemento || '')
    const [bairro, setBairro] = useState(selectedClient.pessoa.endereco[0].bairro || '')
    const [cidade, setCidade] = useState(selectedClient.pessoa.endereco[0].cidade || '')
    const [uf, setUf] = useState(selectedClient.pessoa.endereco[0].UF || '')
    const [errors, setErrors] = useState({})

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

    const handleSubmit = e => {
        setIsLoading()
        e.preventDefault()
        e.stopPropagation()
        validateInputs()
        if (Object.values(errors).some(field => field)) {
            setIsNotLoading()
            return
        }
        ClienteProvider.createOrUpdate(
            {...selectedClient, nome, email, cpf, login, dataNascimento, numero_telefone, CEP, numero, complemento, logradouro, bairro, cidade, uf, senha: selectedClient.pessoa.senha},
            reloadWindow)
    }
    const onClickDelete = () => {
        ClienteProvider.delete(selectedClient.id, reloadWindow)
    }

    return (
        <BaseForm key='cliente-form' id='cliente-form' onSubmit={handleSubmit} {...props}>
            <InputRow>
                <InputWithLabel
                    label='Nome'
                    value={nome}
                    onChange={setNome}
                    isInvalid={Boolean(errors.nome)}
                />
                <LoginInputWithLabel
                    value={login}
                    onChange={setLogin}
                    isInvalid={Boolean(errors.login)}
                    disabled={selectedClient.id}
                />
            </InputRow>
            <InputRow>
                <CpfInputWithLabel
                    value={cpf}
                    onChange={setCpf}
                    isInvalid={Boolean(errors.cpf)}
                    disabled={selectedClient.id}
                />
                <EmailInputWithLabel
                    value={email}
                    onChange={setEmail}
                    type='email'
                    isInvalid={Boolean(errors.email)}
                    disabled={selectedClient.id}
                />
            </InputRow>
            <InputRow>
                <InputWithLabel
                    label='Data de Nascimento'
                    value={dataNascimento}
                    onChange={setDataNascimento}
                    type='date'
                    isInvalid={Boolean(errors.dataNascimento)}
                />
                <PhoneInputWithLabel
                    value={numero_telefone}
                    onChange={setTelefone}
                    isInvalid={Boolean(errors.telefone)}
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
            <ButtonOrSpinner label='Atualizar' />
            {selectedClient.id && window.location.href.includes('admin')
                ?
                <div style={{marginLeft: 'auto'}}>
                    <BaseButton onClick={onClickDelete}>Deletar</BaseButton>
                </div>
            : null}
            {selectedClient.id && window.location.href.includes('admin')
                ?
                <div style={{marginLeft: 'auto'}}>
                    <BaseButton onClick={clearClient}>Limpar</BaseButton>
                </div>
            : null}
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

export default connect(mapStateToProps, mapDispatchToProps)(ClienteForm)