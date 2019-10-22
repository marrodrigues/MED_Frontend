import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import { Container, SectionTitle, TabsAndFilter, TabsContainer, Tab } from './baseSection'
import { InputWithLabel, BaseForm } from '../../base'
import DataTable from './DataTable'
import ClienteForm from '../../forms/ClienteForm'
import { CLIENTE_DEFAULT_VALUE, ADMIN_TABS } from '../../../util/constants'
import InputRow from '../../base/form/InputRow'
import { ButtonOrSpinner } from '../../base/button'

const StyledInputWithLabel = styled(InputWithLabel)`
    
`

const FuncionarioSection = ({ employeeList = [], ...props }) => {
    const [selectedTab, setSelectedTab] = useState(ADMIN_TABS[1])
    const [filter, setFilter] = useState('')
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [cpf, setCpf] = useState('')
    const [login, setLogin] = useState('')
    const [dataNascimento, setDataNascimento] = useState('')
    const [numero_telefone, setTelefone] = useState('')
    const [CEP, setCEP] = useState('')
    const [logradouro, setLogradouro] = useState('')
    const [numero, setNumero] = useState('')
    const [complemento, setComplemento] = useState('')
    const [bairro, setBairro] = useState('')
    const [cidade, setCidade] = useState('')
    const [uf, setUf] = useState('')
    const [errors, setErrors] = useState({})

    const renderContent = () => {
        switch (selectedTab) {
            case ADMIN_TABS[0]:
                return (null
                    // <DataTable
                    //     data={clientList}
                    //     filter={filter}
                    //     filterCallback={filterCallback}
                    //     mapCallback={mapCallback}
                    // />
                )
            case ADMIN_TABS[1]:
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
                                width='250px'
                            />
                            <InputWithLabel
                                label='Login'
                                value={login}
                                onChange={setLogin}
                                isInvalid={Boolean(errors.login)}
                                width='250px'
                            />
                            <InputWithLabel
                                label='Cargo'
                                width='150px'
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
                        </InputRow>
                        <ButtonOrSpinner label='Atualizar' />
                    </BaseForm>
                )
            default:
                return null
        }
    }
    return (
        <Container>
            <SectionTitle>Funcionários</SectionTitle>
            <TabsAndFilter>
                <TabsContainer>
                    {ADMIN_TABS.map(tab =>
                        <Tab
                            isSelected={selectedTab === tab}
                            key={tab}
                            onClick={() => setSelectedTab(tab)}
                        >
                            {tab}
                        </Tab>
                    )}
                </TabsContainer>
                {selectedTab === ADMIN_TABS[0] &&
                    <StyledInputWithLabel
                        label='Filtrar'
                        value={filter}
                        onChange={setFilter}
                    />}
            </TabsAndFilter>
            {renderContent()}
        </Container>
    )
}

export default FuncionarioSection