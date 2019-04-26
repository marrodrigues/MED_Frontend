import React from 'react'
import logoMedBranco from '../../assets/img/logo-med-branco.png'

class Header extends React.Component {

    render() {
        return (
            <header class="header">
                <nav>
                    <div class="row">
                        <div class="header__logo-box">
                            <img src={logoMedBranco} alt="logo" class="header__logo"  onClick={() => {window.location.href = '/'}}/>
                        </div>
                        <ul class="main-nav">
                            <li class="main-nav__item"><a href="#about" class="main-nav__item__link">Sobre Nós</a></li>
                            <li class="main-nav__item"><a href="#" class="main-nav__item__link">Menu</a></li>
                            <li class="main-nav__item"><a href="/login/" class="main-nav__item__link">Cadastro / Login</a></li>
                        </ul>
                    </div>
                </nav>
                <div class="header__text-box">
                    <h1 class="heading-primary">
                        <span class="heading-primary--main">MED Pizzaria</span>
                        <span class="heading-primary--sub">Sabor que não se mede!</span>
                    </h1>
                    <a href="#" class="btn btn--white btn--animated">Confira nossos sabores</a>
                </div>
            </header>
        )
    } 

}

export default Header;