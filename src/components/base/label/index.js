import styled from 'styled-components'

const BaseLabel = styled.label`
    font-size: 14px;
    font-weight: bold;
    font-family: HelveticaNeue;
    color: ${({ color }) => color || 'white'};
`
export default BaseLabel