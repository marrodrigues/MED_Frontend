import React from 'react'
import { BaseForm } from '../base'

const MeusPedidosForm = ({}) => {
    const handleSubmit = e => {

    }
    return (
        <BaseForm title='Meus Pedidos' key='my-orders-form' id='my-orders-form' onSubmit={handleSubmit}>

        </BaseForm>
    )
}

export default MeusPedidosForm