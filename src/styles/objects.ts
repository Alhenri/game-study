import styled from 'styled-components';

interface IGameObject {
  y: number;
  x: number;
  yOffset?: number;
  xOffset?: number;
  step?: number;
}

export const GameObject = styled.div<IGameObject>`
  bottom: ${({ y, yOffset = 0, step = 48 }) => `${y * step + yOffset}px`};
  left: ${({ x, xOffset = 0, step = 48 }) => `${x * step + xOffset}px`};
  position: absolute;
`;
