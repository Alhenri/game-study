import styled, { keyframes, css } from 'styled-components';
import { heroPersonAttack, heroPerson, sword_01 } from '../../assets';
import { GameObject } from '../../styles/objects';
interface HeroObjectInterface {
  x: number;
  y: number;
  diretion: 'f' | 'b';
  action?: 'attack';
}

const heroAnimation = (bgWidth: number) => keyframes`
  from {
    background-position-x: 0px;
  }
  to { 
    background-position-x: ${`${-bgWidth}px`}
  }
`;

const SwordIdleAnimation = keyframes`
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.2);
  }
`;

export const HeroObject = styled(GameObject)<HeroObjectInterface>`
  height: 100px;
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

export const HeroWepon = styled(GameObject)<HeroObjectInterface>`
  height: 48px;
  background-repeat: no-repeat;
  position: absolute;
  transform: rotate(45deg)
    ${(p) =>
      p.diretion === 'f'
        ? 'rotate(0deg)'
        : 'rotate(-90deg) translate(-40px, -40px)'};
  z-index: 1;
  background-image: url(${sword_01});
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
          width: 28px;
          /* animation: ${SwordIdleAnimation} 0.5s linear infinite; */
        `;
    }
  }}
`;
