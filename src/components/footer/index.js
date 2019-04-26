import React from 'react'
import styled from 'styled-components'

const ContainerFooter = styled.footer`
    text-align: center;
    font-size: 2.5rem;
    font-style: italic;
    text-transform: uppercase;
    background-color: #F7F7F7;
    font-weight: bold;
    padding: 1rem 0;
`

export default () => {
    return (
        <ContainerFooter>
            Criação e Desenvolvimento Equipe TCC®
        </ContainerFooter>
    )
}