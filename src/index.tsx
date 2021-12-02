import React from 'react';
import ReactDOM from 'react-dom';
import GlobalStyle, { GameBoard } from './styles';
import { Hero } from './components/Hero';
import { Board } from './components/Board';
import { Bot } from './components/Bot';
import GlobalPositionProvider from './hooks/context/GlobalPosition';

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <GlobalPositionProvider>
      <GameBoard>
        <Board>
          <Hero />
          <Bot id='bot_1' />
          <Bot id='bot_2' />
          <Bot id='bot_3' />
          <Bot id='bot_4' />
        </Board>
      </GameBoard>
    </GlobalPositionProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
