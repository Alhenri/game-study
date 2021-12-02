import styled, { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  body, html, #root {
    margin: 0;
    padding: 0;
    box-sizing: border-box;

    overflow: hidden;
    font-family: 'Roboto Mono', monospace;
    font-size: 14px;
    color: aliceblue;
  }
  #root {
    margin: 0;
    padding: 0;
    height: 100vh;
    width: 100vw;
  }
  .App{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    overflow: auto;
  }
  body {
    overflow: hidden auto;
    max-height: 100vh;
    max-width: 100vw;
  }
  #root {
    min-height: 760px;
  }

  ::-webkit-scrollbar {
    width: 2px; /* width of the entire scrollbar */
  }

  ::-webkit-scrollbar-track {
    background: #9b9b9b; /* color of the tracking area */
  }

  ::-webkit-scrollbar-thumb {
    background-color: #9b9b9b; /* color of the scroll thumb */
    border-radius: 20px; /* roundness of the scroll thumb */
    border: 3px solid #e3e3e3; /* creates padding around scroll thumb */
  }
`;

export const GameBoard = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  justify-content: center;
  align-items: center;
  background-color: black;
`;
