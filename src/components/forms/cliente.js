import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { BaseForm, InputWithLabel } from '../base'
import { validateCep, isLocationValid } from '../../util/validation'
import { ButtonOrSpinner } from '../base/button'
import { setLoading, setNotLoading } from '../../actions'
import InputRow from '../base/form/InputRow'
import { UserProvider } from '../../providers'
import { PESSOA_DEFAULT_VALUE } from '../../util/constants'
// import styled from 'styled-components'

const ClienteForm = ({ selectedClient: initial, setIsLoading, setIsNotLoading, loading, ...props }) => {
    const [selectedClient, setSelectedClient] = useState(initial || PESSOA_DEFAULT_VALUE)
    useEffect(() => {
        setSelectedClient(selectedClient)
    }, [selectedClient])
    const [nome, setNome] = useState(selectedClient.pessoa.nome || '')
    const [email, setEmail] = useState(selectedClient.pessoa.email || '')
    const [cpf, setCpf] = useState(selectedClient.pessoa.cpf || '')
    const [login, setLogin] = useState(selectedClient.pessoa.login || '')
    const [dataNascimento, setDataNascimento] = useState(selectedClient.pessoa.dataNascimento || '')
    const [numero_telefone, setTelefone] = useState(selectedClient.pessoa.telefone[0].numero_telefone || '')
    const [CEP, setCEP] = useState(selectedClient.pessoa.endereco[0].CEP || '')
    const [logradouro, setLogradouro] = useState(selectedClient.pessoa.endereco[0].logradouro || '')
    const [numero, setNumero] = useState(selectedClient.pessoa.endereco[0].numero || '')
    const [complemento, setComplemento] = useState(selectedClient.pessoa.endereco[0].complemento || '')
    const [bairro, setBairro] = useState(selectedClient.pessoa.endereco[0].bairro || '')
    const [cidade, setCidade] = useState(selectedClient.pessoa.endereco[0].cidade || '')
    const [uf, setUf] = useState(selectedClient.pessoa.endereco[0].UF || '')
    const [errors, setErrors] = useState({})

    useEffect(() => {
        if (CEP.length !== 9) return
        setIsLoading()
        validateCep(CEP)
            .then(response => response.data)
            .then(data => {
                if (data.erro || !isLocationValid(data)) {
                    setErrors({ ...errors, CEP: true })
                } else {
                    const { bairro, localidade: cidade, logradouro, uf } = data
                    setBairro(bairro)
                    setCidade(cidade)
                    setLogradouro(logradouro)
                    setUf(uf)
                    setErrors({ ...errors, CEP: false })
                }
            })
            .catch(error => {
                console.log(error);
                setErrors({ ...errors, CEP: true })
            })
            .finally(() => {
                setIsNotLoading()
            })
    }, [CEP])

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
        // UserProvider.create({ nome, email, cpf, login, dataNascimento, numero_telefone, CEP, numero, complemento, logradouro, bairro, cidade, uf })
        //     .then(response => {
        //         debugger
        //     })
        //     .catch(error => {
        //         console.log(error)
        //     })
        //     .finally(() => {
        //         setIsNotLoading()
        //     })
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
                    <InputWithLabel
                        label='Login'
                        value={login}
                        onChange={setLogin}
                        isInvalid={Boolean(errors.login)}
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
                    label='Email'
                    value={email}
                    onChange={setEmail}
                    type='email'
                    isInvalid={Boolean(errors.email)}
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
                <InputWithLabel
                    label='Telefone'
                    value={numero_telefone}
                    onChange={setTelefone}
                    isInvalid={Boolean(errors.telefone)}
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
            </InputRow00>
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

export default connect(mapStateToProps, mapDispatchToProps)(ClienteForm)