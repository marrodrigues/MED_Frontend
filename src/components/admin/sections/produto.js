import React from 'react'
import styled from 'styled-components'
import ProductForm from '../../forms/product'

const Tabs = styled.div`
    display: flex;
    width: 100%;
    margin: 2vh 0;
`
const Tab = styled.span`
    font-size: 18px;
    padding: 1vh 2vw;
    border: 1px solid gray;
    &:not(:first-child) {
        border-left: none;
    }
    :hover {
        cursor: pointer;
    }
    ${props => props.isSelected
    ? `
        background: rgba(255, 0, 0, 0.3);
        color: black;
    `
    : ''
    };
`
const ProductTable = styled.table`
   tr {
    font-size: 18px;
    :hover {
        cursor: pointer;
        color: black;
        // font-weight: bold;
        background-color: #CCC9F7;
    }
    :nth-child(even){
        background-color: #f2f2f2;
    }
`

const tabs = ['Formulário', 'Lista']

export default class InsumoSection extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            selectedProduct: {},
            selectedTab: tabs[0],
        }
    }
    
    selectProduct(selectedProduct) {
        // // // // debugger
        console.log(selectedProduct)
        this.setState({selectedProduct, selectedTab: 'Formulário'})
    }
    selectTab(tab) {
        console.log(tab)
        this.setState({selectedTab: tab})
    }
    render() {
        const { productList } = this.props || []
        console.log(productList, this.state)
        return (
            <React.Fragment>
                <h1>Produtos</h1>
                <Tabs>
                    {tabs.map(tab => 
                        <Tab 
                            isSelected={this.state.selectedTab === tab} 
                            key={tab}
                            onClick={() => this.selectTab(tab)}
                        >
                                {tab}
                        </Tab>
                    )}
                </Tabs>
                {
                    this.state.selectedTab === 'Formulário' && 
                    <ProductForm selectedProduct={this.state.selectedProduct} />
                }
                {
                    productList.length && this.state.selectedTab === 'Lista' &&
                    <ProductTable>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Tamanho</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                productList.map(product => (
                                    <tr key={product.id} onClick={() => { this.selectProduct(product) }}>
                                        <td>{product.nome}</td>
                                        <td>{product.tamanho}</td>
                                    </tr>        
                                ))
                            }
                        </tbody>
                    </ProductTable>
                }
                {/* {
                    this.state.selectedTab === 'Lista' &&
                    <ul className='name-list'>
                        { productList.map(product => <li onClick={() => this.selectProduct(product)} key={product.id}>{product.nome}</li>) }
                    </ul>
                } */}
                
                {/* <ul className='attr-list'>
                    {this.state.selectedProduct.id && this.renderProductInfo() }
                </ul> */}
            </React.Fragment>
        )
    }
}