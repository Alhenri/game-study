import React, { useContext } from 'react';
import { HeroStatusContext } from '../../hooks/context/HeroStatus';
import { HeroObject, HeroWepon } from './styles';

const Hero: React.FC = () => {
  const { status } = useContext(HeroStatusContext);

  if (status.life <= 0) return null;

  return (
    <>
      <HeroObject
        x={status.position.x}
        y={status.position.y}
        yOffset={24}
        diretion={status.direction}
        action={status.action}
      />
      {/* <HeroWepon
        x={status.position.x}
        y={status.position.y}
        yOffset={32}
        xOffset={40}
        diretion={status.direction}
        action={status.action}
      /> */}
    </>
  );
};

export { Hero };
