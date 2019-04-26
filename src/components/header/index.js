import React from 'react'
import logoMedBranco from '../../assets/img/logo-med-branco.png'
import HeaderV2 from '../header-v2'

class Header extends React.Component {

    render() {
        return (
            <header class="header">
                <HeaderV2 />
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