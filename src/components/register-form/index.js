// dependencies
import React from 'react'
import styled from 'styled-components'

// components
import CepInput from '../cep-input'
import BaseInput from '../base/input'
import BaseLabel from '../base/label'
import BaseForm from '../base/form'
import BaseButton from '../base/button'
import Hero from '../hero'

import Spinner from 'react-spinkit'

import { FORM_INPUT_IDS } from '../../util/constants'

import UserProvider from '../../providers/user'

const RegisterForm = styled(BaseForm)`
`

const FormContainer = styled.div`
    padding-top: 10vh;
`

const InputRow = styled.div`
    display: flex;
    justify-content: space-between;
    min-width: 550px;
`
const InputCol = styled.div`
    display: flex;
    flex-direction: column;
`

export default class extends React.Component {
    state = {
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
    }


    submit = (e) => {
        // debugger
        e.preventDefault();
        UserProvider.create(this.state)
        // console.log('Submit');
    }

    handleChangeInput = (event) => {
        let currentState = this.state
        currentState[event.target.id] = event.target.value
        this.setState({...currentState})
    }

    render () {
        return (
                <Hero>
                    <RegisterForm onSubmit={this.submit}>   
                        <BaseLabel htmlFor={FORM_INPUT_IDS.NOME}>NOME</BaseLabel>
                        <BaseInput
                            id={FORM_INPUT_IDS.NOME}
                            name={FORM_INPUT_IDS.NOME}
                            noValidation
                            onChange={this.handleChangeInput}
                            value={this.state[FORM_INPUT_IDS.NOME]}
                        />
                        <InputRow>
                            <InputCol>
                                <BaseLabel htmlFor={FORM_INPUT_IDS.CPF}>CPF</BaseLabel>
                                <BaseInput
                                    id={FORM_INPUT_IDS.CPF}
                                    name={FORM_INPUT_IDS.CPF}
                                    noValidation
                                    onChange={this.handleChangeInput}
                                    value={this.state[FORM_INPUT_IDS.CPF]}
                                    maxLength={11}
                                />
                            </InputCol>
                            <InputCol>
                                <BaseLabel htmlFor={FORM_INPUT_IDS.TELEFONE}>TELEFONE</BaseLabel>
                                <BaseInput
                                    id={FORM_INPUT_IDS.TELEFONE}
                                    name={FORM_INPUT_IDS.TELEFONE}
                                    noValidation
                                    onChange={this.handleChangeInput}
                                    value={this.state[FORM_INPUT_IDS.TELEFONE]}
                                />
                            </InputCol>
                        </InputRow>
                    
                    
                    <InputRow>
                            <InputCol>
                                <BaseLabel htmlFor={FORM_INPUT_IDS.LOGIN}>LOGIN</BaseLabel>
                                <BaseInput
                                    id={FORM_INPUT_IDS.LOGIN}
                                    name={FORM_INPUT_IDS.LOGIN}
                                    noValidation
                                    onChange={this.handleChangeInput}
                                    value={this.state[FORM_INPUT_IDS.LOGIN]}
                                />
                            </InputCol>
                            <InputCol>
                                <BaseLabel htmlFor={FORM_INPUT_IDS.SENHA}>SENHA</BaseLabel>
                                <BaseInput
                                    id={FORM_INPUT_IDS.SENHA}
                                    name={FORM_INPUT_IDS.SENHA}
                                    noValidation
                                    onChange={this.handleChangeInput}
                                    value={this.state[FORM_INPUT_IDS.SENHA]}
                                />
                            </InputCol>
                        </InputRow>
                        
                        <InputRow>
                            <InputCol>
                                <BaseLabel htmlFor={FORM_INPUT_IDS.NASCIMENTO}>NASCIMENTO</BaseLabel>
                                <BaseInput
                                    id={FORM_INPUT_IDS.NASCIMENTO}
                                    name={FORM_INPUT_IDS.NASCIMENTO}
                                    noValidation
                                    onChange={this.handleChangeInput}
                                    value={this.state[FORM_INPUT_IDS.NASCIMENTO]}
                                />
                            </InputCol>

                            <InputCol>
                                <BaseLabel htmlFor={FORM_INPUT_IDS.EMAIL}>EMAIL</BaseLabel>
                                <BaseInput
                                    id={FORM_INPUT_IDS.EMAIL}
                                    name={FORM_INPUT_IDS.EMAIL}
                                    noValidation
                                    onChange={this.handleChangeInput}
                                    value={this.state[FORM_INPUT_IDS.EMAIL]}
                                />
                            </InputCol>
                            
                        </InputRow>
                        
                        <InputRow>
                            <InputCol>
                                <CepInput />  
                            </InputCol>
                            <InputCol>
                                <BaseLabel htmlFor={FORM_INPUT_IDS.LOGRADOURO}>LOGRADOURO</BaseLabel>
                                <BaseInput
                                    id={FORM_INPUT_IDS.LOGRADOURO}
                                    name={FORM_INPUT_IDS.LOGRADOURO}
                                    noValidation
                                    onChange={this.handleChangeInput}
                                    value={this.state[FORM_INPUT_IDS.LOGRADOURO]}
                                />    
                            </InputCol>
                            
                        
                        </InputRow>
                        
                        
                        <InputRow>
                        <InputCol>
                                <BaseLabel htmlFor={FORM_INPUT_IDS.NUMERO}>NUMERO</BaseLabel>
                                <BaseInput
                                    id={FORM_INPUT_IDS.NUMERO}
                                    name={FORM_INPUT_IDS.NUMERO}
                                    noValidation
                                    onChange={this.handleChangeInput}
                                    value={this.state[FORM_INPUT_IDS.NUMERO]}
                                />
                            </InputCol>
                            
                            <InputCol>
                                <BaseLabel htmlFor={FORM_INPUT_IDS.BAIRRO}>BAIRRO</BaseLabel>
                                <BaseInput
                                    id={FORM_INPUT_IDS.BAIRRO}
                                    name={FORM_INPUT_IDS.BAIRRO}
                                    noValidation
                                    onChange={this.handleChangeInput}
                                    value={this.state[FORM_INPUT_IDS.BAIRRO]}
                                />
                            </InputCol>
                        </InputRow>
                        
                        <InputRow>
                            <InputCol>
                                <BaseLabel htmlFor={FORM_INPUT_IDS.UF}>UF</BaseLabel>
                                <BaseInput
                                    id={FORM_INPUT_IDS.UF}
                                    name={FORM_INPUT_IDS.UF}
                                    noValidation
                                    onChange={this.handleChangeInput}
                                    value={this.state[FORM_INPUT_IDS.UF]}
                                />
                            </InputCol>
                            <InputCol>
                                <BaseLabel htmlFor={FORM_INPUT_IDS.CIDADE}>CIDADE</BaseLabel>
                                <BaseInput
                                    id={FORM_INPUT_IDS.CIDADE}
                                    name={FORM_INPUT_IDS.CIDADE}
                                    noValidation
                                    onChange={this.handleChangeInput}
                                    value={this.state[FORM_INPUT_IDS.CIDADE]}
                                />
                            </InputCol>
                        </InputRow>
                        <BaseButton
                            type='submit'
                        >
                            Cadastrar
                        </BaseButton>
                        {this.state.loading && <Spinner name='circle' />}
                    </RegisterForm>
                </Hero>
        )
    }
}
