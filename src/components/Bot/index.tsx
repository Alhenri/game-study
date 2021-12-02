import React, { useEffect, useState, useContext } from 'react';
import { HumanObject } from './styles';
import { HeroPostionType, HeroActionsType } from './types';
import { randomNumber } from '../../utils/randomNumber';
import {
  GlobalPositionContext,
  PositionsKeys,
} from '../../hooks/context/GlobalPosition';

const Bot: React.FC<{ id: PositionsKeys }> = ({ id }) => {
  const { positions, setPosition } = useContext(GlobalPositionContext);
  // const [position, setPosition] = useState<HeroPostionType>({
  //   x: randomNumber(0, 20),
  //   y: randomNumber(0, 18),
  // });
  const [direction, setDirection] = useState<'f' | 'b'>('f');
  const [action, setAction] = useState<HeroActionsType>(undefined);

  useEffect(() => {
    function moveBot() {
      switch (randomNumber(0, 5)) {
        case 0:
          setPosition(id, {
            x: 0,
            y: 1,
          });
          break;
        case 1:
          setPosition(id, {
            x: 0,
            y: -1,
          });
          break;
        case 2:
          setDirection('b');
          setPosition(id, {
            x: -1,
            y: 0,
          });
          break;
        case 3:
          setDirection('f');
          setPosition(id, {
            x: 1,
            y: 0,
          });

          break;
        case 4:
          // Não executar o ataque enquanto estiver atacando
          if (!action) {
            setAction('attack');
            setTimeout(() => setAction(undefined), 340);
          }
      }
      setTimeout(() => moveBot(), 500);
    }
    moveBot();
  }, []);

  return (
    <HumanObject
      diretion={direction}
      action={action}
      x={positions[id].x}
      y={positions[id].y}
    />
  );
};

export { Bot };
