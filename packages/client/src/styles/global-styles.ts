import { createGlobalStyle } from 'styled-components';
import './font/OpenSans-Regular.ttf';

export const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
  }
  
  @font-face {
    font-family: 'Open Sans',
    src: local('Open Sans'), url('./fonts/OpenSans-Regular.ttf') format('truetype')
  }

  body {
    font-family: Open Sans, sans-serif;
  }

  #root {
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    font-family: Open Sans, serif;
    line-height: 1.5em;
  }

  input, select {
    font-family: inherit;
    font-size: inherit;
  },
  
  .logo {
    height: 32px;
    margin: 16px;
    background: rgba(255, 255, 255, 0.2);
  }

  .site-layout-sub-header-background {
    background: #fff;
  }

  .site-layout-background {
    background: #fff;
  }
  [data-theme="dark"] .site-layout-sub-header-background {
    background: #141414;
  }
`;
