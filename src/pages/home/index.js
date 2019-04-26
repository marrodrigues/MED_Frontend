import React from 'react'

import About from '../../components/about'
import Header from '../../components/header'
import Hero from '../../components/hero'
import Login from '../../components/login'
import Footer from '../../components/footer'

export default class extends React.Component {

render() {
    return (
        <React.Fragment>
            <Header />
            {/* <Hero /> */}
            <main>
                <About />
                <section class="section-menu" id='menu'>
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
            </main>
            <Footer/>
        </React.Fragment>
    )}
}