import React from 'react'
import styled from 'styled-components'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// import Hamburger from './hamburger'

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
    &:first-child{
        margin-top: 20px;
    }
`
const Content = styled.section`
    display: flex;
    flex-direction: column;
    padding: 1vh 3vw;
    h1 {
        font-size: 28px;
        padding: 2vh 0;
    }
    ul {
        list-style: bullet;
        li {
            font-size: 16px;
        }
    }
`

const data = [{
    icon: 'user',
    name: 'Clientes',
    content: '<h1>Clientes</h1><ul><li>João Roberto Silva</li><li>Pedro Augusto</li><li>Maria Paula Machado</li></ul>'
}, {
    icon: 'pizza-slice',
    name: 'Pedidos',
    content: '<h1>Pedidos</h1><ul><li>Pizza Calabresa Gigante + Guaraná 2L</li><li>Pizza Quatro Queijos Brotinho</li></ul>'
}, {
    icon: 'hard-hat',
    name: 'Funcionários',
    content: '<h1>Funcionários</h1><ul><li>Mario</li><li>Estela</li><li>Diego</li></ul>'
}]

export default class extends React.Component {
    state = {
        selectedItem: data[0]
    }

    onClickNavItem(index){
        this.setState({selectedItem: data[index]})
    }

    render () {
        return (
            <Container>
                <NavBar>
                    MED Pizzaria
                    {/* <Hamburger /> */}
                    {
                        data.map((item, index) => 
                        <NavItem 
                            key={`${item.name}${item.index}`}
                            isSelected={this.state.selectedItem.name === item.name}
                            onClick={() => this.onClickNavItem(index)}
                        >
                            {/* <FontAwesomeIcon icon={'stroopwafel'} /> */}
                            {item.name}
                        </NavItem>)
                    }
                </NavBar>
                <Content dangerouslySetInnerHTML={{__html: this.state.selectedItem.content}}/>
            </Container>
        )
    }
}