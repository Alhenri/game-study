import React, { useContext, useEffect } from 'react';
import { ControlPannelGrid, LifeBar } from './styles';
import { HeroStatusContext } from '../../hooks/context/HeroStatus';

const ControlPannel: React.FC = () => {
  const { status } = useContext(HeroStatusContext);

  return (
    <ControlPannelGrid>
      <div>
        <p>Vida do heroi</p>
        <LifeBar life={status.life}>
          <div />
        </LifeBar>
      </div>
    </ControlPannelGrid>
  );
};

export { ControlPannel };
