import { createGlobalStyle } from "styled-components";
import { theme } from "./theme";

export const GlobalStyle = createGlobalStyle`
  *{
    box-sizing: border-box;
  }
  html,body,#root {
    height: 100vh;
  }
  body {
    margin: 0;
    font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
    background: ${theme.colors.background};
    color: ${theme.colors.text};
    -webkit-font-smoothing:antialiased;
    -moz-osx-font-smoothing:grayscale;
  }
  a { color: inherit; text-decoration: none; }
  button { font-family: inherit; }
  :focus {
    outline: 3px solid rgba(37,99,235,0.18);
    outline-offset: 2px;
  }
`;