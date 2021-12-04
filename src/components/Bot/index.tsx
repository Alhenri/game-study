import React, { useEffect, useState, useContext, useCallback } from 'react';
import { HumanObject } from './styles';
import { randomNumber } from '../../utils/randomNumber';
import {
  GlobalPositionContext,
  PositionTypes,
} from '../../hooks/context/GlobalPosition';

interface IPosition {
  x: number;
  y: number;
}

const Bot: React.FC<{ id: string }> = ({ id }) => {
  const {
    positions,
    setBotPositions,
    status,
    canvas: { getCanvasObject },
  } = useContext(GlobalPositionContext);
  const [timeOutId, setTimeOutId] = useState<number>();
  const [direction, setDirection] = useState<'f' | 'b'>('f');

  const onBotTryMove = useCallback(
    (
      prevPosition: IPosition,
      newPosition: IPosition,
      p: PositionTypes
    ): PositionTypes => {
      switch (getCanvasObject(newPosition)) {
        case 'demon':
          return {
            ...p,
            [id]: prevPosition,
          };
        case 'wall':
          return { ...p, [id]: prevPosition };
        default:
          return { ...p, [id]: newPosition };
      }
    },
    [getCanvasObject, id]
  );

  useEffect(() => {
    function moveBot() {
      switch (randomNumber(0, 5)) {
        case 0: // up
          setBotPositions((p) =>
            p[id]
              ? {
                  ...p,
                  ...onBotTryMove(p[id], { ...p[id], y: p[id].y + 1 }, p),
                }
              : {
                  ...p,
                  [id]: { x: randomNumber(5, 15), y: randomNumber(5, 15) },
                }
          );
          break;
        case 1: // down
          setBotPositions((p) =>
            p[id]
              ? {
                  ...p,
                  ...onBotTryMove(p[id], { ...p[id], y: p[id].y - 1 }, p),
                }
              : {
                  ...p,
                  [id]: { x: randomNumber(5, 15), y: randomNumber(5, 15) },
                }
          );
          break;
        case 2: // left
          setDirection('b');
          setBotPositions((p) =>
            p[id]
              ? {
                  ...p,
                  ...onBotTryMove(p[id], { ...p[id], x: p[id].x - 1 }, p),
                }
              : {
                  ...p,
                  [id]: { x: randomNumber(5, 15), y: randomNumber(5, 15) },
                }
          );
          break;
        case 3: // right
          setDirection('f');
          setBotPositions((p) =>
            p[id]
              ? {
                  ...p,
                  ...onBotTryMove(p[id], { ...p[id], x: p[id].x + 1 }, p),
                }
              : {
                  ...p,
                  [id]: { x: randomNumber(5, 15), y: randomNumber(5, 15) },
                }
          );

          break;
      }

      setTimeOutId(setTimeout(() => moveBot(), 500) as unknown as number);
    }
    moveBot();
  }, []);

  if (status[id]?.status === 'die') {
    clearTimeout(timeOutId);
    return null;
  }

  return (
    <HumanObject
      id={id}
      diretion={direction}
      yOffset={20}
      x={positions[id]?.x}
      y={positions[id]?.y}
    />
  );
};

export { Bot };
