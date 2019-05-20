import React from 'react'
import styled from 'styled-components'
import Spinner from 'react-spinkit'

import BaseForm from '../base/form'
import BaseFormTitle from '../base/form-title'
import BaseLabel from '../base/label'
import BaseInput from '../base/input'
import BaseButton from '../base/button'

import CepInput from '../inputs/cep-input'

import { FORM_INPUT_IDS } from '../../util/constants'

const PreRegisterForm = styled(BaseForm)`
    background: darkgray;
`

export default class extends React.Component {
    state = {
        loading: false,
        [FORM_INPUT_IDS.NUMERO]: '',
        [FORM_INPUT_IDS.COMPLEMENTO]: '',
        [FORM_INPUT_IDS.CEP]: ''
    }
    handleChangeInput = (event) => {
        let currentState = this.state
        currentState[event.target.id] = event.target.value
        this.setState({ ...currentState })
    }
    submit = (e) => {
        debugger
        e.preventDefault();
        // console.log('Submit');
    }
    
    render () {
        return (
            <PreRegisterForm onSubmit={this.submit}>
                <BaseFormTitle title='Cadastre-se' />
                <CepInput
                    onChange={this.handleChangeInput}
                />
                <BaseLabel htmlFor={FORM_INPUT_IDS.NUMERO}>Número</BaseLabel>
                <BaseInput
                    id={FORM_INPUT_IDS.NUMERO}
                    name={FORM_INPUT_IDS.NUMERO}
                    noValidation
                    onChange={this.handleChangeInput}
                    value={this.state[FORM_INPUT_IDS.NUMERO]}
                />
                <BaseLabel htmlFor={FORM_INPUT_IDS.COMPLEMENTO}>Complemento</BaseLabel>
                <BaseInput
                    id={FORM_INPUT_IDS.COMPLEMENTO}
                    name={FORM_INPUT_IDS.COMPLEMENTO}
                    noValidation
                    onChange={this.handleChangeInput}
                    value={this.state[FORM_INPUT_IDS.COMPLEMENTO]}
                />
                <BaseButton type='submit'>
                    Cadastrar
                </BaseButton>
                {this.state.loading && <Spinner name='circle' />}
            </PreRegisterForm>
        )
    }
}