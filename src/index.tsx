import React from 'react';
import ReactDOM from 'react-dom';
import GlobalStyle, { GameBoard } from './styles';
import { Hero } from './components/Hero';
import { Board } from './components/Board';
import { Bot } from './components/Bot';
import { ControlPannel } from './components/ControlPannel';
import { GlobalPositionProvider } from './hooks/context/GlobalPosition';
import { HeroStatusContextProvider } from './hooks/context/HeroStatus';

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <GlobalPositionProvider>
      <HeroStatusContextProvider>
        <GameBoard>
          <ControlPannel />
          <Board>
            <Hero />
            <Bot id='bot_1' />
            <Bot id='bot_2' />
            <Bot id='bot_3' />
            <Bot id='bot_4' />
          </Board>
        </GameBoard>
      </HeroStatusContextProvider>
    </GlobalPositionProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
