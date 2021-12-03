import React, { createContext, useState } from 'react';

export type ConfigType = {
  volume: number;
  debugging: boolean;
};

export type GameConfigType = {
  config: ConfigType;
  setConfig: React.Dispatch<React.SetStateAction<ConfigType>>;
};
export const GameConfigContext = createContext({} as GameConfigType);

const GameConfigProvider: React.FC = ({ children }) => {
  const [config, setConfig] = useState<ConfigType>({
    volume: 3,
    debugging: false,
  });
  return (
    <GameConfigContext.Provider value={{ config, setConfig }}>
      {children}
    </GameConfigContext.Provider>
  );
};

export { GameConfigProvider };
