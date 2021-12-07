import React, { useState, useCallback } from 'react';

// valor de x deve ser somado com 1
// valor de y deve ser invertido devido a matriz está invertida

const InitialCanvasMap: number[][] = [
  // 0  1  2  3  4  5  6  7  8  9  10 11 12 13 14 15 16 17 18 19 20 21
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // 19
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // 18
  [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], // 17
  [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], // 16
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], // 15
  [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], // 14
  [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], // 13
  [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], // 12
  [1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // 11
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], // 10
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], // 9
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], // 8
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], // 7
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1], // 6
  [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], // 5
  [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], // 4
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], // 3
  [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], // 2
  [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], // 1
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // 0
];

export type ObjectsTypes = 'wall' | 'demon' | 'clear' | null;

export type PayloadCanvasType = {
  canvas: number[][];
  setCanvasObject: (
    objectId: string,
    position: { x: number; y: number },
    type: ObjectsTypes
  ) => any;
  getCanvasObject: (position: { x: number; y: number }) => ObjectsTypes;
};

export type useCanvasType = () => PayloadCanvasType;

const useCanvas: useCanvasType = () => {
  const [prevPosition, setPrevPosition] = useState<{
    [id: string]: { x: number; y: number };
  }>({});
  const canvas: number[][] = InitialCanvasMap;

  const setCanvasObject = useCallback(
    (objectId, position: { x: number; y: number }, type: ObjectsTypes) => {
      switch (type) {
        case 'demon':
          if (prevPosition[objectId]) {
            const { y: prev_y, x: prev_x } = prevPosition[objectId];
            canvas[19 - prev_y][prev_x + 1] = 0; // deixo o espaço vazio
          }
          setPrevPosition((p) => ({ ...p, [objectId]: position }));
          canvas[19 - position.y][position.x + 1] = 2; // coloco o demon lá
          break;
        case 'clear':
          if (prevPosition[objectId]) {
            const { y: prev_y, x: prev_x } = prevPosition[objectId];
            canvas[19 - prev_y][prev_x + 1] = 0;
            setPrevPosition((p) => ({ ...p, [objectId]: null }));
          }
          break;
        default:
          break;
      }
    },
    [canvas, prevPosition]
  );

  const getCanvasObject = useCallback(
    (position: { x: number; y: number }): ObjectsTypes => {
      switch (canvas[19 - position.y][position.x + 1]) {
        case 1:
          return 'wall';
        case 2:
          return 'demon';
        default:
          return null;
      }
    },
    [canvas]
  );
  return { canvas, setCanvasObject, getCanvasObject };
};

export { useCanvas };
