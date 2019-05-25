import React from 'react'
import styled from 'styled-components'

// const Container = styled.section`
//     display: flex;
//     flex-direction: column;

// `

export default class InsumoSection extends React.Component {
    render() {
        const { supplyList } = this.props || []
        console.log(supplyList)
        return (
            <React.Fragment>
                <h1>Insumos</h1>
                <ul className='name-list'>
                    { supplyList.map(supply => <li key={supply.id}>{supply.descricao}</li>) }
                </ul>
            </React.Fragment>
        )
    }
}