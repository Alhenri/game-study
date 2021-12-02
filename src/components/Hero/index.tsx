import React, { useEffect, useState } from 'react';
import { HeroObject } from './styles';
import { HeroPostionType, HeroActionsType } from './types';

const Hero: React.FC = () => {
  const [position, setPosition] = useState<HeroPostionType>({
    x: 0,
    y: 1,
  });
  const [direction, setDirection] = useState<'f' | 'b'>('f');
  const [action, setAction] = useState<HeroActionsType>(undefined);

  const [pressCount, setPressCount] = useState<number>(0);

  useEffect(() => {
    window.addEventListener(
      'keydown',
      ({ key }) => {
        setPressCount(pressCount + 1);
        switch (key) {
          case 'ArrowUp':
            setPosition((p) => ({ ...p, y: p.y === 17 ? 17 : p.y + 1 }));
            break;
          case 'ArrowDown':
            setPosition((p) => ({ ...p, y: p.y === 1 ? 1 : p.y - 1 }));
            break;
          case 'ArrowLeft':
            setDirection('b');
            setPosition((p) => ({ ...p, x: p.x === 0 ? 0 : p.x - 1 }));
            break;
          case 'ArrowRight':
            setDirection('f');
            setPosition((p) => ({ ...p, x: p.x === 19 ? 19 : p.x + 1 }));
            break;
          case 'q':
            // Não executar o ataque enquanto estiver atacando
            if (!action) {
              setAction('attack');
              setTimeout(() => setAction(undefined), 340);
            }
        }
      },
      { once: true }
    );
  }, [pressCount]);

  return (
    <HeroObject
      x={position.x}
      y={position.y}
      diretion={direction}
      action={action}
    />
  );
};

export { Hero };
