import React from 'react'
import styled from 'styled-components'

import AlterarSenhaSection from './sections/change-password'
import MeusPedidosSection from './sections/my-orders'
import MeusDadosSection from './sections/my-data'

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
    // max-width: 180px;
    background: #F7B944;
    font-size: 30px;
    color: white;
    text-align: center;
    // text-decoration: underline;
    white-space: nowrap;

`
const NavItem = styled.a`
    color: ${props => props.isSelected ? '#236C4A' : 'white'};
    margin: 0 1px;
    padding: 20px 2vw;
    font-size: 18px;
    text-transform: uppercase;
    text-decoration: none;
    font-weight: 600;
    // border: ${props => props.isSelected ? '1px dashed white' : '1px solid transparent'};
    background-color: ${props => props.isSelected ? '#FFD27C' : 'transparent'};
    &:first-child {
        margin-top: 20px;
    }
    :hover {
        cursor: pointer;
        background-color: #FFD27C;
    }
`
const Content = styled.section`
    display: flex;
    flex-direction: column;
    padding: 1vh 3vw;
    h1 {
        font-size: 28px;
        padding: 2vh 0;
        color: #236C4A;
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
const Logo = styled.div`
    width: 145px;
    height: 120px;
    background: url('/image/logo-verde.png') center center/cover no-repeat;
    margin: 2vh 2vw;
    :hover {
        cursor: pointer;
    }
`

const sections = { data: 'Meus Dados', orders: 'Meus Pedidos', password: 'Alterar Senha'}

export default class extends React.Component {
    state = {
        selectedItem: sections.data
    }

    onClickNavItem(section){
        this.setState({selectedItem: section})
    }

    componentDidMount() {

    }

    renderSection () {
        switch (this.state.selectedItem) {
            case sections.password:
                return <AlterarSenhaSection />
            case sections.orders:
                return <MeusPedidosSection />
            case sections.data:
            default: 
                return <MeusDadosSection />
        }
    }

    render () {
        
        return (
            <Container>
                <NavBar>
                    <Logo onClick={() => {window.location.href = '/'}} />
                    {
                        Object.values(sections).map((section, index) => 
                        <NavItem 
                            key={`${section}${section.index}`}
                            isSelected={this.state.selectedItem === section}
                            onClick={() => this.onClickNavItem(section)}
                        >
                            {section}
                        </NavItem>)
                    }
                </NavBar>
                <Content>
                    {this.renderSection()}
                </Content>
            </Container>
        )
    }
}