import React from 'react';
import ReactDOM from 'react-dom';
import GlobalStyle, { GameBoard } from './styles';
import { Hero } from './components/Hero';
import { Board } from './components/Board';
import { Bot } from './components/Bot';
import { DebugGrid } from './components/Debug';
import { ControlPannel } from './components/ControlPannel';
import { GlobalPositionProvider } from './hooks/context/GlobalPosition';
import { HeroStatusContextProvider } from './hooks/context/HeroStatus';
import { GameConfigProvider } from './hooks/context/GameConfigContext';

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <GameConfigProvider>
      <GlobalPositionProvider>
        <HeroStatusContextProvider>
          <GameBoard>
            <ControlPannel />
            <Board>
              <Hero />
              <DebugGrid />
              <Bot id='bot_1' />
              <Bot id='bot_2' />
              <Bot id='bot_3' />
              <Bot id='bot_4' />
              <Bot id='bot_5' />
              <Bot id='bot_6' />
              <Bot id='bot_7' />
              <Bot id='bot_8' />
            </Board>
          </GameBoard>
        </HeroStatusContextProvider>
      </GlobalPositionProvider>
    </GameConfigProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
