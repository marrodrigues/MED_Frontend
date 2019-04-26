// dependencies
import React from 'react'
import styled from 'styled-components'

// constants
import { FORM_INPUT_IDS } from '../../util/constants'

// components
import BaseInput from '../base/input'
import BaseLabel from '../base/label'
import BaseForm from '../base/form'

const LoginForm = styled(BaseForm)`
`

export default class extends React.Component {
    render () {
        return (
            <LoginForm>
                <BaseLabel htmlFor={FORM_INPUT_IDS.LOGIN}>Login</BaseLabel>
                <BaseInput
                    id={FORM_INPUT_IDS.LOGIN}
                    name={FORM_INPUT_IDS.LOGIN}
                    noValidation
                />
                <BaseLabel htmlFor={FORM_INPUT_IDS.SENHA}>Senha</BaseLabel>
                <BaseInput
                    id={FORM_INPUT_IDS.SENHA}
                    name={FORM_INPUT_IDS.SENHA}
                    noValidation
                />
            </LoginForm>
        )
    }
}