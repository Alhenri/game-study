import React, { useContext, useEffect } from 'react';
import { ControlPannelGrid, LifeBar } from './styles';
import { HeroStatusContext } from '../../hooks/context/HeroStatus';

const ControlPannel: React.FC = () => {
  const { status, setStatus } = useContext(HeroStatusContext);

  useEffect(() => {
    function simulateLife() {
      setStatus(s => ({...s, life: s.life - 1}))
      setTimeout(simulateLife, 800);
    }
    simulateLife();
  }, []);

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
