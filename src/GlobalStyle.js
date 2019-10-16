import { createGlobalStyle, css } from 'styled-components'

import helveticaPath from './assets/font/helvetica-neue.ttf'
import raspoutinePath from './assets/font/RaspoutineDemiBold_TB.otf'

const fontFaces = css`
  @font-face {
    font-family: 'HelveticaNeue';
    src: url(${helveticaPath}) format('opentype');
    font-style: normal;
  }
  @font-face {
    font-family: 'Raspoutine';
    src: url(${raspoutinePath}) format('opentype');
    font-style: normal;
  }
`;
const cssReset = css`
  body {
    margin: 0;
    padding: 0;
    background-image: linear-gradient(135deg, #ffffff 25%, #ffe8c4 25%, #ffe8c4 50%, #ffffff 50%, #ffffff 75%, #ffe8c4 75%, #ffe8c4 100%);
    background-size: 28.28px 28.28px;
  }
`;

const GlobalStyle = createGlobalStyle`
  ${cssReset}  
  ${fontFaces}
`

export default GlobalStyle