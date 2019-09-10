import React from 'react'
import styled from 'styled-components'

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
    font: Bold calc(6px + 1vw) Helvetica;
    text-decoration: none;
` 
const NavLogoContainer = styled.div`
    background-color: #FFD27C;
    min-height: 150px;
    min-width: 200px;
    margin-top: 10vh;
    height: 20vh;
    width: 10vw;
    border-radius: 0px 0px 30px 30px;
    display: flex;
    justify-content: center;
    align-items: center
    background-image: url('/image/logo.png');
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
`
const NavLogo = styled.img`
    padding-top: 5vh;
    width: 10vw;
`

const HeaderComponent = () => (
    <Header>
        <Nav>
            <NavItem><NavLink href='/#about'>Sobre nós</NavLink></NavItem>
            <NavItem><NavLink href='/coming-soon/'>Cardápio</NavLink></NavItem>
            <NavItem><NavLink href='/'><NavLogoContainer /></NavLink></NavItem>
            <NavItem><NavLink href='/#footer'>Cadastro/Login</NavLink></NavItem>
            <NavItem><NavLink href='/coming-soon/'>Contato</NavLink></NavItem>
        </Nav>
    </Header>
)

export default HeaderComponent