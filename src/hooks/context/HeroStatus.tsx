import React, { createContext, useState, useContext, useEffect } from 'react';
import { GlobalPositionContext, PositionsKeys } from './GlobalPosition';

export type HeroPostionType = {
  x: number;
  y: number;
};

export type HeroActionsType = 'attack' | undefined;

export type HeroStatusType = {
  direction: 'f' | 'b';
  position: HeroPostionType;
  action: HeroActionsType;
  life: number;
};

export type HeroStatusContextType = {
  status: HeroStatusType;
  setStatus: React.Dispatch<React.SetStateAction<HeroStatusType>>;
};

export const HeroStatusContext = createContext<HeroStatusContextType>(
  {} as HeroStatusContextType
);

const HeroStatusContextProvider: React.FC = ({ children }) => {
  const { positions, setStatus: setBotStatus } = useContext(
    GlobalPositionContext
  );

  const [status, setStatus] = useState<HeroStatusType>({
    action: undefined,
    direction: 'f',
    position: { x: 2, y: 2 },
    life: 100,
  });

  useEffect(() => {
    if (status.action === 'attack') {
      Object.keys(positions).forEach((botId) => {
        if (
          (positions[botId].x === status.position.x &&
            positions[botId].y === status.position.y) ||
          (positions[botId].x === status.position.x + 1 &&
            positions[botId].y === status.position.y &&
            status.direction === 'f') ||
          (positions[botId].x === status.position.x - 1 &&
            positions[botId].y === status.position.y &&
            status.direction === 'b')
        ) {
          setBotStatus((s) => ({ ...s, [botId]: { status: 'die' } }));
        }
      });
    }
  }, [status.action]);
  return (
    <HeroStatusContext.Provider value={{ status, setStatus }}>
      {children}
    </HeroStatusContext.Provider>
  );
};

export { HeroStatusContextProvider };
