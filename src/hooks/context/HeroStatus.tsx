import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from 'react';
import { GlobalPositionContext } from './GlobalPosition';

export type HeroPostionType = {
  x: number;
  y: number;
};

export type HeroActionsType = 'attack' | undefined;

export type HeroStatusType = {
  direction: 'f' | 'b';
  position: HeroPostionType;
  action: HeroActionsType;
  life: number;
};

export type HeroStatusContextType = {
  status: HeroStatusType;
  setStatus: React.Dispatch<React.SetStateAction<HeroStatusType>>;
};

export const HeroStatusContext = createContext<HeroStatusContextType>(
  {} as HeroStatusContextType
);

const HeroStatusContextProvider: React.FC = ({ children }) => {
  const {
    positions,
    setStatus: setBotStatus,
    canvas: { getCanvasObject },
  } = useContext(GlobalPositionContext);

  const [pressCount, setPressCount] = useState<number>(0);
  const [status, setStatus] = useState<HeroStatusType>({
    action: undefined,
    direction: 'f',
    position: { x: 2, y: 2 },
    life: 100,
  });

  useEffect(() => {
    if (status.life <= 0) {
      setTimeout(() => {
        window.alert('Você morreu! O jogo reiniciará :/');
        window.location.reload();
      }, 2000);
    }
  }, [status.life]);

  useEffect(() => {
    if (status.action === 'attack') {
      Object.keys(positions).forEach((botId) => {
        if (
          (positions[botId].x === status.position.x &&
            positions[botId].y === status.position.y) ||
          (positions[botId].x === status.position.x + 1 &&
            positions[botId].y === status.position.y &&
            status.direction === 'f') ||
          (positions[botId].x === status.position.x - 1 &&
            positions[botId].y === status.position.y &&
            status.direction === 'b')
        ) {
          setBotStatus((s) => ({ ...s, [botId]: { status: 'die' } }));
        }
      });
    }
  }, [status.action]);

  const onHeroTryMove = useCallback(
    (
      prevPosition: HeroPostionType,
      newPosition: HeroPostionType,
      s: HeroStatusType
    ): HeroStatusType => {
      switch (getCanvasObject(newPosition)) {
        case 'demon':
          return { ...s, position: newPosition, life: s.life - 20 };
        case 'wall':
          return { ...s, position: prevPosition };
        default:
          return { ...s, position: newPosition };
      }
    },
    [getCanvasObject]
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
              ...onHeroTryMove(
                s.position,
                {
                  ...s.position,
                  y: s.position.y + 1,
                },
                s
              ),
            }));
            break;
          case 'ArrowDown':
            setStatus((s) => ({
              ...s,
              ...onHeroTryMove(
                s.position,
                {
                  ...s.position,
                  y: s.position.y - 1,
                },
                s
              ),
            }));
            break;
          case 'ArrowLeft':
            setStatus((s) => ({ ...s, direction: 'b' }));
            setStatus((s) => ({
              ...s,
              ...onHeroTryMove(
                s.position,
                {
                  ...s.position,
                  x: s.position.x - 1,
                },
                s
              ),
            }));
            break;
          case 'ArrowRight':
            setStatus((s) => ({ ...s, direction: 'f' }));
            setStatus((s) => ({
              ...s,
              ...onHeroTryMove(
                s.position,
                {
                  ...s.position,
                  x: s.position.x + 1,
                },
                s
              ),
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
    <HeroStatusContext.Provider value={{ status, setStatus }}>
      {children}
    </HeroStatusContext.Provider>
  );
};

export { HeroStatusContextProvider };
