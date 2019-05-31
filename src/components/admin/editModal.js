import React from 'react';
import styled from 'styled-components'
import Modal from 'react-modal';
import Spinner from 'react-spinkit'

import BaseForm from '../base/form'
import BaseInput from '../base/input'
import BaseLabel from '../base/label'
import BaseButton from '../base/button'
import BaseFormTitle from '../base/form-title'

import UserProvider from '../../providers/user'

const StyledModal = styled(Modal)`
    // .Modal {
    //     display: flex;
    //     background-color: papayawhip;
    // }
`
const disabledFields = ['id', 'pessoaid', 'login', 'uf', 'cidade', 'logradouro', 'bairro']
const hiddenFields = ['updatedat', 'createdat', 'senha', 'flag_bloqueado', 'motivo_bloqueio']

Modal.setAppElement('#root')
export default class extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            
        }
    }
    componentDidUpdate(prevProps) {
        const initializedState = {...this.initializeState('user', this.props.user, '')}
            // .reduce((acc, cur) => {
                
            // }, {})
        // console.log(initializedState)
        // console.log(this.state)
        if (prevProps !== this.props) {
            this.setState({
                ...this.state,
                ...this.initializeState('user', this.props.user, '')
            })
        }
    }

    initializeState(propName, obj, rootObj) {
        // // debugger
        let fields = {}
        if (typeof obj === 'object') {
            if (Array.isArray(obj)) {
                // fields.push(...obj.map((element) => this.initializeState(propName, element, rootObj)))
                // fields = {...fields, ...obj.map((element) => this.initializeState(propName, element, rootObj))}
                fields = {...fields, ...this.initializeState(propName, obj[0], '')}
                
            } else {
                for (let key in obj) {
                    // fields.push(this.initializeState(key, obj[key], propName))
                    // fields[`${propName}-${key}`] = this.initializeState(key, obj[key], propName)
                    fields = {...fields, ...this.initializeState(key, obj[key], propName)}
                }
            }
        } else {
            fields[`${rootObj}-${propName}`] = obj
        }
        return fields
    }

    renderInputFields(propName, obj, rootObj) {
        console.log(propName, obj);

        let inputs = []
        if (typeof obj === 'object') {
            if (Array.isArray(obj)) {
                inputs.push(...obj.map((element) => this.renderInputFields(propName, element, rootObj)))
            } else {
                for (let key in obj) {
                    inputs.push(this.renderInputFields(key, obj[key], propName))
                }
            }
        } else {
            if (!hiddenFields.includes(propName.toLowerCase())) {
                inputs.push(
                    (<React.Fragment>
                        <BaseLabel
                            key={`label-${rootObj}-${propName}`}
                            htmlFor={propName}>
                            {/* {`${propName}: ${obj}`} */}
                            {`${rootObj}-${propName}`}
                        </BaseLabel>
                        <BaseInput
                            key={`input-${rootObj}-${propName}`}
                            noValidation
                            name={propName}
                            onChange={(event) => { this.setState({ [`${rootObj}-${propName}`]: event.target.value }) }}
                            value={this.state[`${rootObj}-${propName}`]}
                            disabled={disabledFields.includes(propName.toLowerCase())}
                        />
                    </React.Fragment>)
                )
            }
        }
        // // debugger
        return inputs
    }

    submit = (e) => {
        // console.log(e, this.state)
        e.preventDefault();
        UserProvider.update(this.state)
        // // debugger
    }

    render() {
        const { isOpen, contentLabel, onRequestClose, user } = this.props
        console.log(isOpen, user);

        return (
            <Modal
                isOpen={isOpen}
                contentLabel={contentLabel}
                onRequestClose={onRequestClose}
            >
                <BaseForm
                    onSubmit={this.submit}
                >
                    <BaseFormTitle title='Alterar Usuário' />
                    {this.renderInputFields('user', user, '')}
                    {/* <BaseLabel htmlFor={FORM_INPUT_IDS.NOME}>NOME</BaseLabel>
                    <BaseInput
                        id={FORM_INPUT_IDS.NOME}
                        name={FORM_INPUT_IDS.NOME}
                        noValidation
                        onChange={this.handleChangeInput}
                        value={this.state[FORM_INPUT_IDS.NOME]}
                    /> */}

                    <BaseButton
                        type='submit'
                    >
                        Salvar
                    </BaseButton>
                    {this.state.loading && <Spinner name='circle' />}
                </BaseForm>
            </Modal>
        )
    }
}