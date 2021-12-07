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
  const [positions, setBotPositions] = useState<PositionTypes>({
    bot_1: {
      x: 4,
      y: 3,
    },
    bot_2: {
      x: 2,
      y: 3,
    },
    bot_3: {
      x: 15,
      y: 15,
    },
    bot_4: {
      x: 9,
      y: 17,
    },
    bot_5: {
      x: 11,
      y: 2,
    },
    bot_6: {
      x: 16,
      y: 12,
    },
    bot_7: {
      x: 2,
      y: 15,
    },
    bot_8: {
      x: 13,
      y: 7,
    },
  });
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
