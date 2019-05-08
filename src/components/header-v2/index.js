// Dependencies
import React from 'react'
import styled from 'styled-components'

// Data
import data from '../../data/components/header'

import { KEYS } from '../../util/constants'
import Session from '../../providers/session'
import UserProvider from '../../providers/user'

// Styled Components
const Header = styled.div`
    position: fixed;
    top: 0px;
    // background: transparent;
    background-color:rgba(0,0,0,0.3);
    width: 100%;
    box-sizing: border-box;
    z-index: 99;

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
    state = {
        hasToken: false
    }
    onClickLogo = () => {
        window.location.href = '/'
    }

    componentDidMount () {
        this.setState({hasToken: Session.checkKey(KEYS.TOKEN)})  
    }
    onClickLogout = () => {
        window.localStorage.removeItem(KEYS.TOKEN)
        this.setState({hasToken: false})
        UserProvider.logout()
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
                        <li class="main-nav__item"><a href="/#menu" class="main-nav__item__link">Cardápio</a></li>
                        <li class="main-nav__item"><a href="/register/" class="main-nav__item__link">Cadastro</a></li>
                        {this.state.hasToken 
                        ? <li key='logout' class="main-nav__item"><a href='/' onClick={this.onClickLogout} class="main-nav__item__link">Logout</a></li>
                        : <li key='login' class="main-nav__item"><a href="/#login" class="main-nav__item__link">Login</a></li>}
                    </ul>
                </Nav>
            </Header>
        )
    }
}