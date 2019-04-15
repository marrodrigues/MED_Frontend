import React from 'react'
import styled from 'styled-components'

const ContainerFooter = styled.footer`
    text-align: center;
    font-size: 1.4rem;
    font-style: italic;
    text-transform: uppercase;
    background-color: #F7F7F7;
`

export default () => {
    return (
        <ContainerFooter>
            <footer>
                Criação e Desenvolvimento Equipe TCC®
            </footer>
        </ContainerFooter>
    )
}