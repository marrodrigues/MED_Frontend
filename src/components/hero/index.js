import React from 'react'
import styled from 'styled-components'

const Main = styled.main`
    // position: absolute;
    // top: 0;
    // left: 0;
    // width: 100vw;
    height: 100vh;
    background-image:
        linear-gradient(to right bottom, rgba(252, 216, 101, 0.5), rgba(252, 0, 0, 0.5)),
        url(/static/media/pizza_header.2ef83791.jpg);
    background-size: cover;
    clip-path: polygon(0 0, 100% 0, 100% 75vh, 0 100%); 
`

export default class extends React.Component {
    render() {
        return (
            <Main>
                {this.props.children}
            </Main>
        )
    }
}