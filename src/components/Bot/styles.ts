import styled, { css, keyframes } from 'styled-components';
import { GameObject } from '../../styles/objects';
import { botEnemy } from '../../assets';

const heroAnimation = (bgWidth: number) => keyframes`
  from {
    background-position-x: 0px;
  }
  to { 
    background-position-x: ${`${-bgWidth}px`}
  }
`;

interface HeroObjectInterface {
  x: number;
  y: number;
  diretion: 'f' | 'b';
  action?: 'attack';
}

export const HumanObject = styled(GameObject)<HeroObjectInterface>`
  height: 100px;
  background-repeat: no-repeat;
  transform: ${(p) =>
    p.diretion === 'f' ? 'rotateY(0deg)' : 'rotateY(180deg)'};
  z-index: 1;
  ${({ action }) => {
    switch (action) {
      default:
        return css`
          background-image: url(${botEnemy});
          width: 48px;
          animation: ${heroAnimation(192)} 0.5s steps(4) infinite;
        `;
    }
  }}
`;
