import React from 'react'
import styled from 'styled-components'

import { About, Header, Hero, Footer } from '../../components'

const Container = styled.div`
    background-image: linear-gradient(135deg, #ffffff 25%, #ffe8c4 25%, #ffe8c4 50%, #ffffff 50%, #ffffff 75%, #ffe8c4 75%, #ffe8c4 100%);
    background-size: 28.28px 28.28px;
`

const HomePage = () => (
    <Container>
        <Header />
        <Hero />
        <About />
        <Footer />
    </Container>
)

export default HomePage