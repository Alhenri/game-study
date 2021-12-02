import React, { createContext, useState } from 'react';

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
  const [status, setStatus] = useState<HeroStatusType>({
    action: undefined,
    direction: 'f',
    position: { x: 2, y: 2 },
    life: 100,
  });
  return (
    <HeroStatusContext.Provider value={{ status, setStatus }}>
      {children}
    </HeroStatusContext.Provider>
  );
};

export { HeroStatusContextProvider };
