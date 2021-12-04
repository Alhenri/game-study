import styled from 'styled-components';

interface IGameObject {
  y: number;
  x: number;
  yOffset?: number;
  xOffset?: number;
  step?: number;
}

export const GameObject = styled.div.attrs<IGameObject>(
  ({ x, y, step = 48, yOffset = 0, xOffset = 0 }) => ({
    style: { bottom: y * step + yOffset, left: x * step + xOffset },
  })
)<IGameObject>`
  position: absolute;
`;
