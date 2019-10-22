import React from 'react'

export default class MeusPedidosSection extends React.Component {
    render() {
        const { myOrdersList } = this.props || []
        return (
            <React.Fragment>
                <h1>Meus Pedidos</h1>
                Lista de Pedidos
            </React.Fragment>
        )
    }
}