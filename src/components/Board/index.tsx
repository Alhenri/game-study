import React, { useEffect } from 'react';
import { ArenaScreen } from '../../assets';
import ReactHowler from 'react-howler';
import sound_theme from '../../assets/sounds/theme.mp3';

window.onload = () => {
  var context = new AudioContext();
  context.resume();
};

const Board: React.FC = ({ children }) => {
  return (
    <div style={{ position: 'relative' }}>
      <ReactHowler src={sound_theme} playing={true} preload={true} volume={0.1} loop />
      <img src={ArenaScreen} alt='Arena' style={{ height: 960, width: 960 }} />
      {children}
    </div>
  );
};
export { Board };
