import React from 'react'

import pizza1 from '../../assets/img/pizza-1.jpg'
import pizza2 from '../../assets/img/pizza-2.jpg'
import pizza3 from '../../assets/img/pizza-3.jpg'

class About extends React.Component {

    render() {
        return (
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
                        {[pizza1, pizza2, pizza3].map((pizza, index) => <img key={index} src={pizza} alt={`Photo ${index + 1}`} class={`composition__photo composition__photo--p${index +1}`} />)}
                        </div>
                    </div>
                </div>
            </section>
        )
    } 

}

export default About