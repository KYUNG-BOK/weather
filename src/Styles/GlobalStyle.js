import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'sans-serif';
    background-color: #f0f2f5;
  }
`;

export default GlobalStyle;
