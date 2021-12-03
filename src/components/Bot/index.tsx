import React, { useEffect, useState, useContext } from 'react';
import { HumanObject } from './styles';
import { HeroPostionType, HeroActionsType } from './types';
import { randomNumber } from '../../utils/randomNumber';
import {
  GlobalPositionContext,
  PositionsKeys,
} from '../../hooks/context/GlobalPosition';

const Bot: React.FC<{ id: PositionsKeys }> = ({ id }) => {
  const { positions, setBotPosition, status } = useContext(
    GlobalPositionContext
  );

  const [direction, setDirection] = useState<'f' | 'b'>('f');
  const [action, setAction] = useState<HeroActionsType>(undefined);

  useEffect(() => {
    function moveBot() {
      switch (randomNumber(0, 5)) {
        case 0:
          setBotPosition(id, {
            x: 0,
            y: 1,
          });
          break;
        case 1:
          setBotPosition(id, {
            x: 0,
            y: -1,
          });
          break;
        case 2:
          setDirection('b');
          setBotPosition(id, {
            x: -1,
            y: 0,
          });
          break;
        case 3:
          setDirection('f');
          setBotPosition(id, {
            x: 1,
            y: 0,
          });

          break;
        // case 4:
        //   // Não executar o ataque enquanto estiver atacando
        //   if (!action) {
        //     setAction('attack');
        //     setTimeout(() => setAction(undefined), 340);
        //   }
      }
      setTimeout(() => moveBot(), 500);
    }
    moveBot();
  }, []);

  if (status[id]?.status === 'die') {
    return null;
  }

  return (
    <HumanObject
      id={id}
      diretion={direction}
      action={action}
      x={positions[id]?.x}
      y={positions[id]?.y}
    />
  );
};

export { Bot };
