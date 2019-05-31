import React from 'react'
import styled from 'styled-components'

// const Container = styled.section`
//     display: flex;
//     flex-direction: column;

// `

export default class LoteSection extends React.Component {
    render() {
        const { bundleList } = this.props || []
        console.log(bundleList)
        return (
            <React.Fragment>
                <h1>Lotes</h1>
                <ul className='name-list'>
                    { bundleList.map(bundle => <li key={bundle.id}>{bundle.descricao}</li>) }
                </ul>
            </React.Fragment>
        )
    }
}