import React, { useContext } from 'react';
import { GlobalPositionContext } from '../../hooks/context/GlobalPosition';
import { GameConfigContext } from '../../hooks/context/GameConfigContext';
import { GameObject } from '../../styles/objects';

const DebugGrid: React.FC = () => {
  const {
    canvas: { canvas },
  } = useContext(GlobalPositionContext);

  const {
    config: { debugging },
  } = useContext(GameConfigContext);

  if (!debugging) return null;

  return (
    <>
      {canvas.map((row, rowIndex) => {
        return row.map((col, colIndex) => {
          return (
            <GameObject
              key={`${rowIndex}-${colIndex}`}
              style={{
                border: '1px solid red',
                height: 48,
                width: 48,
                fontSize: 15,
                textAlign: 'revert',
                display: 'flex',
                alignItems: 'end',
                justifyContent: 'center',
              }}
              y={rowIndex}
              x={colIndex - 1}
            >
              {canvas[19 - rowIndex][colIndex]}
            </GameObject>
          );
        });
      })}
    </>
  );
};

export { DebugGrid };
