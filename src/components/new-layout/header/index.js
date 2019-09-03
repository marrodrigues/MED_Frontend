import React from 'react'
import styled from 'styled-components'

import logo from './logo.png'

const Header = styled.header`
// position: fixed;
    position: absolute;
    top: 0;
    display: flex;
    justify-content: center;
    height: 10vh;
    width: 100%;
`
const Nav = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 5vw;
    height: 10vh;
    width: 80%;
    background-color: #F7B944;
    border-radius: 0px 0px 30px 30px;
`
const NavItem = styled.div`
    
`
const NavLink = styled.a`
    text-transform: uppercase;
    text-align: center;
    color: white;
    font: Bold 12px Helvetica;
` 
const NavLogoContainer = styled.div`
    background-color: #FFD27C;
    min-height: 180px;
    min-width: 250px;
    height: 20vh;
    width: 10vw;
    border-radius: 0px 0px 30px 30px;
    display: flex;
    justify-content: center;
    align-items: center
`
const NavLogo = styled.img`
    padding-top: 5vh;
    width: 10vw;
`

const HeaderComponent = () => (
    <Header>
        <Nav>
            <NavItem><NavLink>Sobre nós</NavLink></NavItem>
            <NavItem><NavLink>Cardápio</NavLink></NavItem>
            <NavItem><NavLogoContainer><NavLogo src={logo} /></NavLogoContainer></NavItem>
            <NavItem><NavLink>Cadastro/Login</NavLink></NavItem>
            <NavItem><NavLink>Contato</NavLink></NavItem>
        </Nav>
    </Header>
)

export default HeaderComponent