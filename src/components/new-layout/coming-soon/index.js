import React from 'react'
import styled from 'styled-components'

const ComingSoonContainer = styled.section`
    margin-top: 5vh;
    min-height: 50vh;
    background-image: linear-gradient(135deg, #ffffff 25%, #ffe8c4 25%, #ffe8c4 50%, #ffffff 50%, #ffffff 75%, #ffe8c4 75%, #ffe8c4 100%);
    background-size: 28.28px 28.28px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
const TextContiner = styled.p`
    font: Bold calc(8px + 2vw) Helvetica;
`

const ComingSoonComponent = () => (
    <ComingSoonContainer>
        <TextContiner>Em breve, novidades!</TextContiner>
    </ComingSoonContainer>
)

export default ComingSoonComponent