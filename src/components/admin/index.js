import React from 'react'
import styled from 'styled-components'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ClienteProvider from '../../providers/cliente'
import FuncionarioProvider from '../../providers/funcionario'
import InsumoProvider from '../../providers/insumo'
import PedidoProvider from '../../providers/pedido'
import ProdutoProvider from '../../providers/produto'

import Hamburger from './hamburger'
import ClienteSection from './sections/cliente'
import FuncionarioSection from './sections/funcionario'
import InsumoSection from './sections/insumo'
import LoteSection from './sections/lote'
import PedidoSection from './sections/pedido'
import ProdutoSection from './sections/produto'

const Container = styled.main`
    display: flex;
    height: 100vh;
    width: 100vw;
`
const NavBar = styled.nav`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: fit-content;
    max-width: 180px;
    background: red;
    font-size: 30px;
    color: white;
    text-align: center;
    text-decoration: underline;

`
const NavItem = styled.a`
    color: white;
    margin: 0 1px;
    padding: 5px 2vw;
    font-size: 18px;
    border: ${props => props.isSelected ? '1px dashed white' : '1px solid transparent'};
    background-color: ${props => props.isSelected ? '#00A0F4' : 'transparent'};
    &:first-child {
        margin-top: 20px;
    }
    :hover {
        cursor: pointer;
        background-color: #00E794;
    }
`
const Content = styled.section`
    display: flex;
    flex-direction: column;
    padding: 1vh 3vw;
    min-width: fit-content;
    min-height: fit-content;
    width: 100%;
    height: 100%;
    h1 {
        font-size: 28px;
        padding: 2vh 0;
    }
    .name-list {
        list-style: bullet;
        li {
            font-size: 18px;
            :hover {
                cursor: pointer;
                color: black;
                font-weight: bold;
                background-color: #CCC9F7;
            }
        }
    }
    .attr-list {
        list-style: square;
        li {
            font-size: 14px;

        }
    }
`


// const data = [{
//     icon: 'user',
//     name: 'Clientes',
//     content: '<h1>Clientes</h1><ul><li>João Roberto Silva</li><li>Pedro Augusto</li><li>Maria Paula Machado</li></ul>'
// }, {
//     icon: 'pizza-slice',
//     name: 'Pedidos',
//     content: '<h1>Pedidos</h1><ul><li>Pizza Calabresa Gigante + Guaraná 2L</li><li>Pizza Quatro Queijos Brotinho</li></ul>'
// }, {
//     icon: 'hard-hat',
//     name: 'Funcionários',
//     content: '<h1>Funcionários</h1><ul><li>Mario</li><li>Estela</li><li>Diego</li></ul>'
// }]

const sections = { client: 'Clientes', employee: 'Funcionários', supply: 'Insumos', bundle: 'Lotes', order: 'Pedidos', product: 'Produtos'}


// const list = ['Joao', 'Maria', 'Jose', 'Mario']

export default class extends React.Component {
    state = {
        selectedItem: sections.client,
        // input: '',
        clientList: [],
        employeeList: [],
        supplyList: [],
        bundleList: [],
        orderList: [],
        productList: []
    }

    onClickNavItem(section){
        this.setState({selectedItem: section})
    }

    componentDidMount = () => {
        ClienteProvider.getAll((clientList) => {
            this.setState({clientList})
        })
        FuncionarioProvider.getAll((employeeList) => {
            this.setState({employeeList})
        })
        InsumoProvider.getAll((supplyList) => {
            this.setState({supplyList})
        })
        // PedidoProvider.getAll((orderList) => {
        //     this.setState({orderList})
        // })
        ProdutoProvider.getAll((productList) => {
            this.setState({productList})
        })
    }
    renderSection () {
        switch (this.state.selectedItem) {
            case sections.product:
                return <ProdutoSection productList={this.state.productList} />
            case sections.order:
                return <PedidoSection orderList={this.state.orderList} />
            case sections.bundle:
                return <LoteSection bundleList={this.state.bundleList} />
            case sections.supply:
                return <InsumoSection supplyList={this.state.supplyList} />
            case sections.employee:
                return <FuncionarioSection employeeList={this.state.employeeList} />
            case sections.client:
            default: 
                return <ClienteSection clientList={this.state.clientList} />
        }
    }

    render () {
        console.log(this.state);
        
        return (
            <Container>
                <NavBar>
                    MED Pizzaria
                    {/* <Hamburger /> */}
                    {
                        Object.values(sections).map((section, index) => 
                        <NavItem 
                            key={`${section}${section.index}`}
                            isSelected={this.state.selectedItem === section}
                            onClick={() => this.onClickNavItem(section)}
                        >
                            {/* <FontAwesomeIcon icon={'stroopwafel'} /> */}
                            {section}
                        </NavItem>)
                    }
                </NavBar>
                {/* <input value={this.state.input} onChange={(value) => {this.setState({input: value.target.value})}}/>
                {list.filter((nome)=> nome.toLowerCase().indexOf(this.state.input.toLowerCase()) > -1).map((nome => <div>{nome}</div>))} */}
                {/* <Content dangerouslySetInnerHTML={{__html: this.state.selectedItem.content}}/> */}
                <Content>
                    {this.renderSection()}
                </Content>
            </Container>
        )
    }
}