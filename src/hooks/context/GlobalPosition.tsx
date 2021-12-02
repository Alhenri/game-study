import { createContext, useState, useCallback } from 'react';
import { randomNumber } from '../../utils/randomNumber';

export type PositionsKeys = 'bot_1' | 'bot_2' | 'bot_3' | 'bot_4';

export type PositionTypes = {
  [key in PositionsKeys]: { x: number; y: number };
};

export type GlobalPositionType = {
  positions: PositionTypes;
  setPosition: (key: PositionsKeys, position: { x: number; y: number }) => void;
};

export const GlobalPositionContext = createContext<GlobalPositionType>(
  {} as GlobalPositionType
);

const GlobalPositionProvider: React.FC = ({ children }) => {
  const [positions, setPositions] = useState<PositionTypes>({
    bot_1: {
      x: randomNumber(0, 20),
      y: randomNumber(0, 18),
    },
    bot_2: {
      x: randomNumber(0, 20),
      y: randomNumber(0, 18),
    },
    bot_3: {
      x: randomNumber(0, 20),
      y: randomNumber(0, 18),
    },
    bot_4: {
      x: randomNumber(0, 20),
      y: randomNumber(0, 18),
    },
  });

  const auxSetPositions = useCallback(
    (key: PositionsKeys, position: { x: number; y: number }) => {
      setPositions((positions) => ({
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
      }));
    },
    []
  );

  return (
    <GlobalPositionContext.Provider
      value={{
        positions,
        setPosition: auxSetPositions,
      }}
    >
      {children}
    </GlobalPositionContext.Provider>
  );
};

export { GlobalPositionProvider };
