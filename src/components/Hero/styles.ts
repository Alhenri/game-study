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

const SwordIdleAnimationR = keyframes`
  from {
    transform: scale(1) translate(0px, 0px) rotate(60deg);
  }
  to {
    transform: scale(1.05) translate(0px, 0px) rotate(60deg);
  }
`;

const SwordIdleAnimationL = keyframes`
  from {
    transform: scale(1) translate(-58px, 0px) rotate(-60deg);
  }
  to {
    transform: scale(1.05) translate(-58px, 0px) rotate(-60deg);
  }
`;

const SwordAttackAnimationR = keyframes`
  0% {
    transform: scale(1) translate(0px, 0px) rotate(60deg);
  } 
  30% {
    transform: scale(1) translate(-9px, -10px) rotate(10deg);
  }
  60%{
    transform: scale(1) translate(0px, 0px) rotate(60deg);
  }
  100% {
    transform: scale(1) translate(-5px, 20px) rotate(120deg);
  }
`;

const SwordAttackAnimationL = keyframes`
  0% {
    transform: scale(1) translate(-58px, 0px) rotate(-60deg);
  } 
  30% {
    transform: scale(1) translate(-58px, -20px) rotate(-10deg);
  }
  60%{
    transform: scale(1) translate(-58px, 0px) rotate(-60deg);
  }
  100% {
    transform: scale(1) translate(-63px, 20px) rotate(-120deg);
  }
`;

export const HeroObject = styled(GameObject)<HeroObjectInterface>`
  height: 100px;
  background-repeat: no-repeat;
  position: absolute;
  transform: ${(p) =>
    p.diretion === 'f' ? 'rotateY(0deg)' : 'rotateY(180deg)'};
  z-index: 1;
  ${({ action }) => {
    switch (action) {
      case 'attack':
        return css`
          background-image: url(${heroPerson});
          width: 48px;
          animation: ${heroAnimation(192)} 0.5s steps(4) infinite;
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
  /* transform: scale(1) translate(-5px, 20px) rotate(120deg); */
  z-index: 0;
  background-image: url(${sword_01});
  ${({ action, diretion }) => {
    switch (action) {
      case 'attack':
        return css`
          width: 28px;
          animation: ${diretion === 'f'
              ? SwordAttackAnimationR
              : SwordAttackAnimationL}
            0.3s linear infinite alternate;
        `;
      default:
        return css`
          width: 28px;
          animation: ${diretion === 'f'
              ? SwordIdleAnimationR
              : SwordIdleAnimationL}
            0.5s linear infinite;
        `;
    }
  }}
`;
