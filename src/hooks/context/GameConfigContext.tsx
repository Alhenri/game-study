import React, { createContext, useState } from 'react';

export type ConfigType = {
  volume: number;
  debugging: boolean;
  difficulty: number;
};

export type GameConfigType = {
  config: ConfigType;
  setConfig: React.Dispatch<React.SetStateAction<ConfigType>>;
};
export const GameConfigContext = createContext({} as GameConfigType);

const GameConfigProvider: React.FC = ({ children }) => {
  const [config, setConfig] = useState<ConfigType>({
    volume: 1,
    debugging: false,
    difficulty: 2,
  });
  return (
    <GameConfigContext.Provider value={{ config, setConfig }}>
      {children}
    </GameConfigContext.Provider>
  );
};

export { GameConfigProvider };
