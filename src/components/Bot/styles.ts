import styled, { css, keyframes } from 'styled-components';

import { heroPersonAttack, heroPerson } from '../../assets';

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

export const HumanObject = styled.div<HeroObjectInterface>`
  height: 100px;
  bottom: ${(p) => `${p.y * 48 + 24}px`};
  left: ${(p) => `${p.x * 48}px`};
  background-repeat: no-repeat;
  position: absolute;
  transform: ${(p) =>
    p.diretion === 'f' ? 'rotateY(0deg)' : 'rotateY(180deg)'};
  z-index: 1;
  ${({ action, x }) => {
    switch (action) {
      case 'attack':
        return css`
          background-image: url(${heroPersonAttack});
          width: 96px;
          left: ${`${x * 48 - 24}px`};
          animation: ${heroAnimation(384)} 0.3s steps(4) infinite;
        `;
      default:
        return css`
          background-image: url(${heroPerson});
          width: 48px;
          animation: ${heroAnimation(192)} 0.5s steps(4) infinite;
        `;
    }
  }}
`;
