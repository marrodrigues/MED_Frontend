// Dependencies
import React from 'react'
import styled from 'styled-components'

// Data
import data from '../../data/components/header'

// Styled Components
const Header = styled.header`
    position: fixed;
    top: 0px;
    background: transparent;
    width: 100%;
    box-sizing: border-box;
    z-index: 1;

`
const Nav = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 1vh 2vw;
`
const LogoContainer = styled.div`
    width: fit-content;
`
const Logo = styled.img`
    height: auto;
    width: 5vw;

    object-fit: contain;
`

export default class extends React.Component {
    render () {
        return (
            <Header>
                <Nav>
                    <LogoContainer>
                        <Logo src={data.logoImg} alt="logo" class="header__logo"  onClick={() => {window.location.href = '/'}}/>
                    </LogoContainer>
                    <ul class="main-nav">
                        <li class="main-nav__item"><a href="#" class="main-nav__item__link">Sobre Nós</a></li>
                        <li class="main-nav__item"><a href="#" class="main-nav__item__link">Menu</a></li>
                        <li class="main-nav__item"><a href="/login/" class="main-nav__item__link">Cadastro / Login</a></li>
                    </ul>
                </Nav>
            </Header>
        )
    }
}