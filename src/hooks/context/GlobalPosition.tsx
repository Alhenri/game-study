import { createContext, useState, useCallback, useEffect } from 'react';
import { useCanvas, PayloadCanvasType } from '../useCanvas';

export type PositionTypes = {
  [key: string]: { x: number; y: number };
};

export type StatusBotType = {
  [key: string]: { status: 'alive' | 'die' };
};

export type GlobalPositionType = {
  positions: PositionTypes;
  setBotPositions: React.Dispatch<React.SetStateAction<PositionTypes>>;
  status: StatusBotType;
  setStatus: React.Dispatch<React.SetStateAction<StatusBotType>>;
  canvas: PayloadCanvasType;
};

export const GlobalPositionContext = createContext<GlobalPositionType>(
  {} as GlobalPositionType
);

const GlobalPositionProvider: React.FC = ({ children }) => {
  const [positions, setBotPositions] = useState<PositionTypes>({});
  const [status, setStatus] = useState<StatusBotType>({});
  const { setCanvasObject, ...restCanvas } = useCanvas();

  useEffect(() => {
    Object.keys(status).forEach((botId) => {
      if (status[botId]?.status === 'die')
        setCanvasObject(botId, positions[botId], 'clear');
    });
  }, [status]);

  useEffect(() => {
    Object.keys(positions).forEach((botId) => {
      if (status[botId]?.status !== 'die')
        setCanvasObject(botId, positions[botId], 'demon');
    });
  }, [positions]);

  return (
    <GlobalPositionContext.Provider
      value={{
        positions,
        setBotPositions,
        status,
        setStatus,
        canvas: { ...restCanvas, setCanvasObject },
      }}
    >
      {children}
    </GlobalPositionContext.Provider>
  );
};

export { GlobalPositionProvider };
