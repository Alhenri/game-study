import React, { useEffect, useState, useContext } from 'react';
import { HeroStatusContext } from '../../hooks/context/HeroStatus';
import { HeroObject } from './styles';

const Hero: React.FC = () => {
  const { status, setStatus } = useContext(HeroStatusContext);
  const [pressCount, setPressCount] = useState<number>(0);

  useEffect(() => {
    window.addEventListener(
      'keydown',
      ({ key }) => {
        setPressCount(pressCount + 1);
        switch (key) {
          case 'ArrowUp':
            setStatus((s) => ({
              ...s,
              position: {
                ...s.position,
                y: s.position.y === 17 ? 17 : s.position.y + 1,
              },
            }));
            break;
          case 'ArrowDown':
            setStatus((s) => ({
              ...s,
              position: {
                ...s.position,
                y: s.position.y === 1 ? 11 : s.position.y - 1,
              },
            }));
            break;
          case 'ArrowLeft':
            setStatus((s) => ({ ...s, direction: 'b' }));
            setStatus((s) => ({
              ...s,
              position: {
                ...s.position,
                x: s.position.x === 0 ? 0 : s.position.x - 1,
              },
            }));
            break;
          case 'ArrowRight':
            setStatus((s) => ({ ...s, direction: 'f' }));
            setStatus((s) => ({
              ...s,
              position: {
                ...s.position,
                x: s.position.x === 19 ? 19 : s.position.x + 1,
              },
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

  return (
    <HeroObject
      x={status.position.x}
      y={status.position.y}
      diretion={status.direction}
      action={status.action}
    />
  );
};

export { Hero };
