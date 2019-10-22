import React from 'react'
import styled from 'styled-components'

// const Container = styled.section`
//     display: flex;
//     flex-direction: column;

// `

export default class PedidoSection extends React.Component {
    render() {
        const { orderList } = this.props || []
        console.log(orderList)
        return (
            <React.Fragment>
                <h1>Pedidos</h1>
                <ul>
                    { orderList.map(order => <li key={order.id}>{order.pessoa.nome}</li>) }
                </ul>
            </React.Fragment>
        )
    }
}