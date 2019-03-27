import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
    font-size: 16px;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  input {
    border-radius: 4px;
    border: 1px solid #d9d9d9;
    font-size: 16px;
    height: 40px;
    padding: 0 8px;

    &:focus {
      /* border-color: #80bdff; */
      outline: 0;
      box-shadow: 0 0 0 0.2rem rgba(54, 79, 107, 0.25);
    }
  }

  button {
    display: inline-flex;
    position: relative;
    appearance: none;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    min-width: 2.5em;
    height: 2.5em;
    padding: 0 0.68em;
    border-radius: 0.25em;
    flex: none;
    user-select: none;
    white-space: nowrap;
    text-decoration: none;
    outline: none;
    font-size: 16px;
    &:hover,
    &:focus {
      box-shadow: inset 0 0 999em rgba(0, 0, 0, 0.15);
    }
    &:active,
    &.active {
      border-style: none;
      box-shadow: inset 0 0 999em rgba(0, 0, 0, 0.075);
    }
    &:after {
      display: none;
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      border-radius: inherit;
      background-color: rgba(255, 255, 255, 0.35);
    }
    &[disabled] {
      pointer-events: none;
      &:after {
        display: block;
      }
    }
  }

`;

export default GlobalStyle;
