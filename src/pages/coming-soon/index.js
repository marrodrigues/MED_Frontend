import React from 'react'
import styled from 'styled-components'

const ComingSoonContainer = styled.section`
    margin-top: 5vh;
    min-height: 50vh;
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