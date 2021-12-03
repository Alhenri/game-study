import styled from 'styled-components';

interface LifeBarProps {
  life: number;
}

export const ControlPannelGrid = styled.div`
  height: 100%;
  padding: 20px 35px;
  display: grid;
  grid-template-rows: auto 150px;
`;

export const LifeBar = styled.div<LifeBarProps>`
  border: 1px solid white;
  div {
    content: '';
    height: 15px;
    display: flex;
    width: calc(${({ life }) => life} * 1%);
    background-color: hsl(calc(${({ life }) => life} * 1.2), 80%, 50%);
    transition: all 0.2s ease;
  }
`;
