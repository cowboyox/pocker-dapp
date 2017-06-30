import React from 'react';
import styled from 'styled-components';

import {
  gray,
  curtainStickyWidth,
  curtainWidth,
  menuClose,
} from '../../variables';

import {
  Logo,
  LogoName,
  NameContainer,
} from '../Logo';

export const CurtainWrapper = styled.div`
  width: ${curtainWidth};
  background-color: #5D5D5D;
  position: absolute;
  top: 0px;
  bottom: 0;
  left: ${(props) => props.isOpen ? '0' : `-${curtainWidth}`};
  z-index: 6;
  padding: 20px;
  transition: .15s ease left;

  @media (min-width: ${curtainStickyWidth}) {
    left: 0px;
  }
`;

export const CurtainTogglerWrapper = styled.div`
  position: absolute;
  ${(props) => props.isOpen ?
    `top: 40px;
    left: 356px;`
    :
    `top: 80px;
    left: 400px;`
  }
  cursor: pointer;
  display: flex;
  align-items: center;
  color: ${gray};
  @media (min-width: ${curtainStickyWidth}) {
    display: none;
  }
`;

export const ToggleTriangle = styled.span`
  width: 70px;
  height: 70px;
  clip: rect(auto, 70px, auto, 50px);
  transform: translateX(-50px);
  &:before {
    content: "";
    position: absolute;
    top: 10px;
    bottom: 10px;
    left: 10px;
    right: 10px;
    background: ${menuClose};
    transform: rotate(-45deg);
  }
`;

export const ToggleIcon = styled.i`
  margin-left: -36px;
`;

export const ToggleText = styled.span`
  padding: 4px 0 0 7px;
  font-size: 16px;
`;

const CurtainHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 6px 0 16px 8px;
`;

const CurtainLogoContainer = styled.div`
  width: 60px;
  height: 60px;
`;

export const CurtainHeader = () => (
  <CurtainHeaderContainer>
    <CurtainLogoContainer>
      <Logo name="curtain-logo" />
    </CurtainLogoContainer>
    <NameContainer>
      <LogoName name="container-name" />
    </NameContainer>
  </CurtainHeaderContainer>
);
