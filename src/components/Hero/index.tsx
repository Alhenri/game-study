import React, { useEffect, useState, useContext, useCallback } from 'react';
import { HeroStatusContext } from '../../hooks/context/HeroStatus';
import { GlobalPositionContext } from '../../hooks/context/GlobalPosition';
import { HeroObject, HeroWepon } from './styles';
interface Iposition {
  x: number;
  y: number;
}

const Hero: React.FC = () => {
  const { status, setStatus } = useContext(HeroStatusContext);
  const {
    canvas: { getCanvasObject },
  } = useContext(GlobalPositionContext);
  const [pressCount, setPressCount] = useState<number>(0);

  const onHeroTryMove = useCallback(
    (prevPosition: Iposition, newPosition: Iposition): Iposition => {
      switch (getCanvasObject(newPosition)) {
        case 'demon':
          setStatus((s) => ({ ...s, life: s.life - 20 }));
          return newPosition;
        case 'wall':
          return prevPosition;
        default:
          return newPosition;
      }
    },
    [getCanvasObject, setStatus]
  );

  useEffect(() => {
    window.addEventListener(
      'keydown',
      ({ key }) => {
        setPressCount(pressCount + 1);
        switch (key) {
          case 'ArrowUp':
            setStatus((s) => ({
              ...s,
              position: onHeroTryMove(s.position, {
                ...s.position,
                y: s.position.y + 1,
              }),
            }));
            break;
          case 'ArrowDown':
            setStatus((s) => ({
              ...s,
              position: onHeroTryMove(s.position, {
                ...s.position,
                y: s.position.y - 1,
              }),
            }));
            break;
          case 'ArrowLeft':
            setStatus((s) => ({ ...s, direction: 'b' }));
            setStatus((s) => ({
              ...s,
              position: onHeroTryMove(s.position, {
                ...s.position,
                x: s.position.x - 1,
              }),
            }));
            break;
          case 'ArrowRight':
            setStatus((s) => ({ ...s, direction: 'f' }));
            setStatus((s) => ({
              ...s,
              position: onHeroTryMove(s.position, {
                ...s.position,
                x: s.position.x + 1,
              }),
            }));
            break;
          case 'q':
            // Não executar o ataque enquanto estiver atacando
            if (!status.action) {
              setStatus((s) => ({ ...s, action: 'attack' }));
              setTimeout(
                () => setStatus((s) => ({ ...s, action: undefined })),
                340
              );
            }
        }
      },
      { once: true }
    );
  }, [pressCount]);

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
