import React from 'react'
import styled from 'styled-components'

// const Container = styled.section`
//     display: flex;
//     flex-direction: column;

// `

export default class ProdutoSection extends React.Component {
    render() {
        const { productList } = this.props || []
        console.log(productList)
        return (
            <React.Fragment>
                <h1>Produtos</h1>
                <ul className='name-list'>
                    { productList.map(product => <li key={product.id}>{product.nome}</li>) }
                </ul>
            </React.Fragment>
        )
    }
}