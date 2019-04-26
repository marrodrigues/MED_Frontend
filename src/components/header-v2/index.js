// Dependencies
import React from 'react'
import styled from 'styled-components'

// Data
import data from '../../data/components/header'

// Styled Components
const Header = styled.header`
    position: fixed;
    top: 0px;
    // background: transparent;
    background-color:rgba(0,0,0,0.4);
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
    onClickLogo = () => {
        window.location.href = '/'
    }

    render () {
        return (
            <Header>
                <Nav>
                    <LogoContainer>
                        <Logo src={data.logoImg} alt="logo" class="header__logo"  onClick={this.onClickLogo}/>
                    </LogoContainer>
                    <ul class="main-nav">
                        <li class="main-nav__item"><a href="/#about" class="main-nav__item__link">Sobre Nós</a></li>
                        <li class="main-nav__item"><a href="#" class="main-nav__item__link">Menu</a></li>
                        <li class="main-nav__item"><a href="/register/" class="main-nav__item__link">Cadastro</a></li>
                        <li class="main-nav__item"><a href="/login/" class="main-nav__item__link">Login</a></li>
                    </ul>
                </Nav>
            </Header>
        )
    }
}