import React, { useContext } from 'react';
import { ArenaScreen } from '../../assets';
import ReactHowler from 'react-howler';
import sound_theme from '../../assets/sounds/theme.mp3';
import { GameConfigContext } from '../../hooks/context/GameConfigContext';

window.onload = () => {
  var context = new AudioContext();
  context.resume();
  window.alert(
    'O game só está funcionando (por enquanto) para telas desktop (1920 x 1080) :/'
  );
};

const Board: React.FC = ({ children }) => {
  const {
    config: { volume },
  } = useContext(GameConfigContext);
  return (
    <div className='board-game' style={{ position: 'relative' }}>
      <ReactHowler
        src={sound_theme}
        playing={true}
        preload={true}
        volume={volume / 10}
        loop
      />
      <img src={ArenaScreen} alt='Arena' style={{ height: 960, width: 960 }} />
      {children}
    </div>
  );
};
export { Board };
