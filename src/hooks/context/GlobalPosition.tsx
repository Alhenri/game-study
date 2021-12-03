import { createContext, useState, useCallback, useEffect } from 'react';
import { randomNumber } from '../../utils/randomNumber';
import { useCanvas, PayloadCanvasType } from '../useCanvas';

export type PositionTypes = {
  [key: string]: { x: number; y: number };
};

export type StatusBotType = {
  [key: string]: { status: 'alive' | 'die' };
};

export type GlobalPositionType = {
  positions: PositionTypes;
  setBotPosition: (key: string, position: { x: number; y: number }) => void;
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

  const auxSetBotPositions = useCallback(
    (key: string, position: { x: number; y: number }) => {
      if (status[key]?.status === 'die') {
      } else {
        setBotPositions((positions) =>
          positions[key]
            ? {
                ...positions,
                [key]: {
                  x:
                    (positions[key].x === 19 && position.x === 1) ||
                    (positions[key].x === 0 && position.x === -1)
                      ? positions[key].x
                      : positions[key].x + position.x,
                  y:
                    (positions[key].y === 17 && position.y === 1) ||
                    (positions[key].y === 1 && position.y === -1)
                      ? positions[key].y
                      : positions[key].y + position.y,
                },
              }
            : {
                ...positions,
                [key]: { x: randomNumber(5, 15), y: randomNumber(5, 15) },
              }
        );
      }
    },
    [status]
  );

  useEffect(() => {
    Object.keys(positions).forEach((botId) => {
      setCanvasObject(botId, positions[botId], 'demon');
    });
  }, [positions]);

  return (
    <GlobalPositionContext.Provider
      value={{
        positions,
        setBotPosition: auxSetBotPositions,
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
