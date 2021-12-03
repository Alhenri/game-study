import React, { useContext, useCallback } from 'react';
import {
  ImVolumeHigh,
  ImVolumeMedium,
  ImVolumeLow,
  ImVolumeMute,
} from 'react-icons/im';
import { VscDebug } from 'react-icons/vsc';
import { ControlPannelGrid, LifeBar } from './styles';
import { HeroStatusContext } from '../../hooks/context/HeroStatus';
import { GameConfigContext } from '../../hooks/context/GameConfigContext';

const level: any = {
  1: 'Facil',
  2: 'Medio',
  3: 'Dificil',
};

const ControlPannel: React.FC = () => {
  const {
    status: { life },
  } = useContext(HeroStatusContext);
  const {
    config: { volume, debugging, difficulty },
    setConfig,
  } = useContext(GameConfigContext);

  const renderSoundIcon = useCallback((): JSX.Element => {
    switch (volume) {
      case 3:
        return (
          <ImVolumeHigh
            style={{ fontSize: 30, cursor: 'pointer' }}
            onClick={() => setConfig((c) => ({ ...c, volume: 2 }))}
          />
        );
      case 2:
        return (
          <ImVolumeMedium
            style={{ fontSize: 30, cursor: 'pointer' }}
            onClick={() => setConfig((c) => ({ ...c, volume: 1 }))}
          />
        );
      case 1:
        return (
          <ImVolumeLow
            style={{ fontSize: 30, cursor: 'pointer' }}
            onClick={() => setConfig((c) => ({ ...c, volume: 0 }))}
          />
        );
      default:
        return (
          <ImVolumeMute
            style={{ fontSize: 30, cursor: 'pointer' }}
            onClick={() => setConfig((c) => ({ ...c, volume: 3 }))}
          />
        );
    }
  }, [volume, setConfig]);

  return (
    <ControlPannelGrid>
      <div className='hero-status'>
        <p>Vida do heroi</p>
        <LifeBar life={life}>
          <div />
        </LifeBar>
      </div>
      <div className='game-control'>
        <p>Config:</p>
        {renderSoundIcon()}
        <VscDebug
          onClick={() => {
            setConfig((s) => ({ ...s, debugging: !s.debugging }));
          }}
          style={{
            color: debugging ? 'green' : 'white',
            fontSize: 30,
            marginLeft: 15,
            cursor: 'pointer',
          }}
        />
        <span
          onClick={() => {
            setConfig((s) => ({
              ...s,
              difficulty: s.difficulty === 3 ? 1 : s.difficulty + 1,
            }));
          }}
          style={{ fontSize: 30, marginLeft: 15, cursor: 'pointer' }}
        >
          {level[difficulty]}
        </span>
      </div>
    </ControlPannelGrid>
  );
};

export { ControlPannel };
