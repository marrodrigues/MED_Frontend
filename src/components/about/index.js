import React from 'react'
import styled from 'styled-components'

import pizza1 from '../../assets/img/pizza-1.jpg'
import pizza2 from '../../assets/img/pizza-2.jpg'
import pizza3 from '../../assets/img/pizza-3.jpg'

const AboutTextContainer = styled.div`
    margin-top: 5rem 0 0;
`

class About extends React.Component {

    render() {
        return (
            <section class="section-about">
                <div class="u-center-text u-margin-bottom-big">
                    <h2 class="heading-secondary" id='about'>
                        Nossa história
                    </h2>
                </div>
                <div class="row">
                    <div class="col-1-of-2">
                        <AboutTextContainer>
                            <h3 class="heading-tertiary u-margin-bottom-small">
                                O sonho que esta se realizando.
                            </h3>
                            <p class="paragraph">
                                A MED Pizzaria é uma empresa fundada por dois sócios no ano de 2018, tem como foco principal atender da melhor forma nossos clientes com nossas deliciosas pizzas dos mais variados sabores.<br/>
                                Com ingredientes selecionados e de primeira qualidade nossos produtos traduzem a satisfação que é fazer parte desse bairro.<br/>
                                Temos como visão de futuro, ser um local de referência de qualidade e de orgulho para nossos clientes, atendendo-os da melhor forma possível, pois sua alegria é nossa satisfação!
                            </p>
                        </AboutTextContainer>
                    </div>
                    <div class="col-1-of-2">
                        <div class="composition">
                        {[pizza1, pizza2, pizza3].map((pizza, index) => <img key={index} src={pizza} alt={`Photo ${index + 1}`} class={`composition__photo composition__photo--p${index +1}`} />)}
                        </div>
                    </div>
                </div>
            </section>
        )
    } 

}

export default About