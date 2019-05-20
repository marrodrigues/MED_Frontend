import React from 'react';
import styled from 'styled-components'
import Modal from 'react-modal';
import Spinner from 'react-spinkit'

import BaseForm from '../../base/form'
import BaseInput from '../../base/input'
import BaseLabel from '../../base/label'
import BaseButton from '../../base/button'
import BaseFormTitle from '../../base/form-title'

import UserProvider from '../../../providers/user'

const StyledModal = styled(Modal)`
    // .Modal {
    //     display: flex;
    //     background-color: papayawhip;
    // }
`

Modal.setAppElement('#root')
export default class extends React.Component {
    state = {
        loading: false
    }
    
    renderInputFields(propName, obj) {
        console.log(propName, obj);
        
        let inputs = []
        if (typeof obj === 'object') {
            if (Array.isArray(obj)) {
                inputs.push(...obj.map((element) => this.renderInputFields(propName, element)))
            } else {
                for (let key in obj) {
                    inputs.push(this.renderInputFields(key, obj[key]))
                }
            }
        } else {
            inputs.push(
                (<React.Fragment>
                    <BaseLabel
                        key={`label-${propName}`}
                        htmlFor={propName}>
                            {`${propName}: ${obj}`}
                    </BaseLabel>
                    <BaseInput
                        key={`input-${propName}`}
                        noValidation
                        onChange={(event)=>{console.log(event)}}
                        value={obj}
                    />
                </React.Fragment>)
            )
        }
        // debugger
        return inputs
    }

    submit(e, t, v) {
        console.log(e, t, v)
        debugger
        // UserProvider.update()

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
                <BaseForm onSubmit={this.submit}>
                    <BaseFormTitle title='Alterar Usuário'/>
                    {this.renderInputFields('Usuário', user)}
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