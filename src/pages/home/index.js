import React from 'react'
import pizza1 from '../../assets/img/pizza-1.jpg'
import pizza2 from '../../assets/img/pizza-2.jpg'
import pizza3 from '../../assets/img/pizza-3.jpg'

// import Header from '../../components/header'
import logoMedBranco from '../../assets/img/logo-med-branco.png'

export default class extends React.Component {

render() {
    return (
        <React.Fragment>
            <header class="header">
                <nav>
                    <div class="row">
                        <div class="header__logo-box">
                            <img src={logoMedBranco} alt="logo" class="header__logo"  onClick={() => {window.location.href = '/'}}/>
                        </div>
                        <ul class="main-nav">
                            <li class="main-nav__item"><a href="#" class="main-nav__item__link">Sobre Nós</a></li>
                            <li class="main-nav__item"><a href="#" class="main-nav__item__link">Menu</a></li>
                            <li class="main-nav__item"><a href="/login/" class="main-nav__item__link">Cadastro / Login</a></li>
                        </ul>
                    </div>
                </nav>
                <div class="header__text-box">
                    <h1 class="heading-primary">
                        <span class="heading-primary--main">MED Pizza</span>
                        <span class="heading-primary--sub">Sabor que não se mede!</span>
                    </h1>
                    <a href="#" class="btn btn--white btn--animated">Confira nossos sabores</a>
                </div>
            </header>
            <main>
                <section class="section-about">
                    <div class="u-center-text u-margin-bottom-big">
                        <h2 class="heading-secondary">
                            Nossa história
                        </h2>
                    </div>
                    <div class="row">
                        <div class="col-1-of-2">
                            <h3 class="heading-tertiary u-margin-bottom-small">
                                O sonho que esta se realizando.
                            </h3>
                            <p class="paragraph">
                                Mussum Ipsum, cacilds vidis litro abertis. Suco de cevadiss, é um leite divinis, qui tem lupuliz, matis, aguis e fermentis. Per aumento de cachacis, eu reclamis. Suco de cevadiss deixa as pessoas mais interessantis. Quem num gosta di mim que vai caçá sua turmis!
                                In elementis mé pra quem é amistosis quis leo. A ordem dos tratores não altera o pão duris. Quem num gosta di mé, boa gentis num é. Não sou faixa preta cumpadi, sou preto inteiris, inteiris.
                                Mussum Ipsum, cacilds vidis litro abertis. Suco de cevadiss, é um leite divinis, qui tem lupuliz, matis, aguis e fermentis. Manduma pindureta quium dia nois paga. Delegadis gente finis, bibendum egestas augue arcu ut est. Diuretics paradis num copo é motivis de denguis.
                            </p>
                        </div>
                        <div class="col-1-of-2">
                            <div class="composition">
                                <img src={pizza1} alt="Photo 1" class="composition__photo composition__photo--p1"/>
                                <img src={pizza2} alt="Photo 2" class="composition__photo composition__photo--p2"/>
                                <img src={pizza3} alt="Photo 3" class="composition__photo composition__photo--p3"/>
                            </div>
                        </div>
                    </div>
                </section>
                <section class="section-menu">
                    <div class="u-center-text u-margin-bottom-big">
                        <h2 class="heading-secondary--white">
                            Cardápio
                        </h2>
                    </div>
                    <div class="row">
                        <div class="col-1-of-4">
                            <div class="card">
                                <div class="card__side card__side--front">
                                    <div class="card__picture card__picture--1">
                                        &nbsp;
                                    </div>
                                </div>
                                <div class="card__side card__side--back">
                                    <div class="card__cta">
                                        <div class="card__menu-box">
                                            <h4 class="card__menu--title">Mussarela</h4>
                                            <ul class="card__ingredientes">
                                                <li>Cebola</li>
                                                <li>Mussarela</li>
                                                <li>Oregano</li>
                                            </ul>
                                        </div>
                                        <a href="#" class="btn btn-text-white">Comprar</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-1-of-4">
                            <div class="card">
                                <div class="card__side card__side--front">
                                    <div class="card__picture card__picture--2">
                                        &nbsp;
                                    </div>
                                </div>
                                <div class="card__side card__side--back">
                                    <div class="card__cta">
                                        <div class="card__menu-box">
                                            <h4 class="card__menu--title">Calabresa</h4>
                                            <ul class="card__ingredientes">
                                                <li>Calabresa</li>
                                                <li>Cebola</li>
                                                <li>Mussarela</li>
                                                <li>Oregano</li>
                                            </ul>
                                        </div>
                                        <a href="#" class="btn btn-text-white">Comprar</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-1-of-4">
                            <div class="card">
                                <div class="card__side card__side--front card__side--front">
                                    <div class="card__picture card__picture--3">
                                        &nbsp;
                                    </div>
                                </div>
                                <div class="card__side card__side--back">
                                    <div class="card__cta">
                                        <div class="card__menu-box">
                                            <h4 class="card__menu--title">Frango com requeijão</h4>
                                            <ul class="card__ingredientes">
                                                <li>Cebola</li>
                                                <li>Frango desfiado</li>
                                                <li>Oregano</li>
                                                <li>Requeijão</li>
                                            </ul>
                                        </div>
                                        <a href="#" class="btn btn-text-white">Comprar</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-1-of-4">
                            <div class="card">
                                <div class="card__side card__side--front card__side--front">
                                    <div class="card__picture card__picture--4">
                                        &nbsp;
                                    </div>
                                </div>
                                <div class="card__side card__side--back">
                                    <div class="card__cta">
                                        <div class="card__menu-box">
                                            <h4 class="card__menu--title">Margherita</h4>
                                            <ul class="card__ingredientes">
                                                <li>Manjericão</li>
                                                <li>Mussarela</li>
                                                <li>Tomate</li>
                                            </ul>
                                        </div>
                                        <a href="#" class="btn btn-text-white">Comprar</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-1-of-4">
                            <div class="card">
                                <div class="card__side card__side--front card__side--front">
                                    <div class="card__picture card__picture--5">
                                        &nbsp;
                                    </div>
                                </div>
                                <div class="card__side card__side--back">
                                    <div class="card__cta">
                                        <div class="card__menu-box">
                                            <h4 class="card__menu--title">Pepperoni</h4>
                                            <ul class="card__ingredientes">
                                                <li>Cebola</li>
                                                <li>Mussarela</li>
                                                <li>Oregano</li>
                                                <li>Pepperoni</li>
                                            </ul>
                                        </div>
                                        <a href="#" class="btn btn-text-white">Comprar</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-1-of-4">
                            <div class="card">
                                <div class="card__side card__side--front card__side--front">
                                    <div class="card__picture card__picture--6">
                                        &nbsp;
                                    </div>
                                </div>
                                <div class="card__side card__side--back">
                                    <div class="card__cta">
                                        <div class="card__menu-box">
                                            <h4 class="card__menu--title">Napolitana</h4>
                                            <ul class="card__ingredientes">
                                                <li>Tomate</li>
                                                <li>Mussarela</li>
                                                <li>Oregano</li>
                                                <li>Parmesão ralado</li>
                                            </ul>
                                        </div>
                                        <a href="#" class="btn btn-text-white">Comprar</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-1-of-4">
                            <div class="card">
                                <div class="card__side card__side--front card__side--front">
                                    <div class="card__picture card__picture--7">
                                        &nbsp;
                                    </div>
                                </div>
                                <div class="card__side card__side--back">
                                    <div class="card__cta">
                                        <div class="card__menu-box">
                                            <h4 class="card__menu--title">Calabresa Especial</h4>
                                            <ul class="card__ingredientes">
                                                <li>Azeitona Preta</li>
                                                <li>Calabresa</li>
                                                <li>Cebola</li>
                                                <li>Mussarela</li>
                                                <li>Philadelphia®</li>
                                            </ul>
                                        </div>
                                        <a href="#" class="btn btn-text-white">Comprar</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-1-of-4">
                            <div class="card">
                                <div class="card__side card__side--front card__side--front">
                                    <div class="card__picture card__picture--8">
                                        &nbsp;
                                    </div>
                                </div>
                                <div class="card__side card__side--back">
                                    <div class="card__cta">
                                        <div class="card__menu-box">
                                            <h4 class="card__menu--title">Portuguesa</h4>
                                            <ul class="card__ingredientes">
                                                <li>Azeitona Preta</li>
                                                <li>Mussarela</li>
                                                <li>Ovo de codorna</li>
                                                <li>Pimentão verde</li>
                                                <li>Presunto</li>
                                            </ul>
                                        </div>
                                        <a href="#" class="btn btn-text-white">Comprar</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-1-of-4">
                            <div class="card">
                                <div class="card__side card__side--front card__side--front">
                                    <div class="card__picture card__picture--9">
                                        &nbsp;
                                    </div>
                                </div>
                                <div class="card__side card__side--back">
                                    <div class="card__cta">
                                        <div class="card__menu-box">
                                            <h4 class="card__menu--title">Frango com Philadelphia®</h4>
                                            <ul class="card__ingredientes">
                                                <li>Frango desfiado</li>
                                                <li>Mussarela</li>
                                                <li>Parmesão ralado</li>
                                                <li>Philadelphia®</li>
                                            </ul>
                                        </div>
                                        <a href="#" class="btn btn-text-white">Comprar</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-1-of-4">
                            <div class="card">
                                <div class="card__side card__side--front card__side--front-">
                                    <div class="card__picture card__picture--10">
                                        &nbsp;
                                    </div>
                                </div>
                                <div class="card__side card__side--back">
                                    <div class="card__cta">
                                        <div class="card__menu-box">
                                            <h4 class="card__menu--title">Catuperoni</h4>
                                            <ul class="card__ingredientes">
                                                <li>Mussarela</li>
                                                <li>Parmesão ralado</li>
                                                <li>Pepperoni</li>
                                                <li>Requeijão</li>
                                            </ul>
                                        </div>
                                        <a href="#" class="btn btn-text-white">Comprar</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-1-of-4">
                            <div class="card">
                                <div class="card__side card__side--front card__side--front-">
                                    <div class="card__picture card__picture--11">
                                        &nbsp;
                                    </div>
                                </div>
                                <div class="card__side card__side--back">
                                    <div class="card__cta">
                                        <div class="card__menu-box">
                                            <h4 class="card__menu--title">4 Queijos</h4>
                                            <ul class="card__ingredientes">
                                                <li>Gorgonzola</li>
                                                <li>Mussarela</li>
                                                <li>Parmesão ralado</li>
                                                <li>Requeijão</li>
                                            </ul>
                                        </div>
                                        <a href="#" class="btn btn-text-white">Comprar</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-1-of-4">
                            <div class="card">
                                <div class="card__side card__side--front card__side--front">
                                    <div class="card__picture card__picture--12">
                                        &nbsp;
                                    </div>
                                </div>
                                <div class="card__side card__side--back">
                                    <div class="card__cta">
                                        <div class="card__menu-box">
                                            <h4 class="card__menu--title">Egg & Bacon</h4>
                                            <ul class="card__ingredientes">
                                                <li>Bacon</li>
                                                <li>Cebola</li>
                                                <li>Mussarela</li>
                                                <li>Cream cheese</li>
                                                <li>Ovo de codorna</li>
                                            </ul>
                                        </div>
                                        <a href="#" class="btn btn-text-white">Comprar</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section class="cadastro">

                </section>
            </main>

            <footer>

            </footer>
        </React.Fragment>
    )}
}