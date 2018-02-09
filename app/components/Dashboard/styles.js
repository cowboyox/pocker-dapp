import styled from 'styled-components';
import { Button } from '../../utils/styleUtils';

import {
  baseColor,
  gray,
} from '../../variables';

export const Pane = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0;
  padding-top: 20px;
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 20px;
  width: 480px;
  align-self: center;

  & + & {
    border-top: 1px solid #ccc;
  }
`;

export const SectionOverview = styled(Section)`
  width: 100%;
`;

export const Text = styled.p`
  padding-right: 10px;
  padding-left: 10px;
`;

// Wallet
export const WalletContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const SendContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const ConfirmButton = styled(Button)`
  display: flex;
  justify-content: center;
  margin: 30px auto;
  padding: 10px;
  min-width: 260px;
  border: 1px solid ${gray};
  border-radius: 4px;
  &:hover {
    background-color: ${gray};
  }
  &:active {
    background-color: ${gray};
    color: white;
  }
`;

export const Input = styled.input`
  width: 100%;
  border: 1px solid ${gray};
  border-radius: 4px;
`;

// Exchange
export const ExchangeContainer = styled.div`
  display: flex;
  justify-content: center;
`;

// Overview
export const ReceiveSection = styled.div`
  display: flex;
  flex-direction: column;
`;

// Balances
export const BalanceSection = styled.div`
  display: flex;
  justify-content: flex-start;
  background-color: #f2f2f2;
  font-size: 1.0em;
  color: #383838;
`;

export const BalanceWrapper = styled.div`
  margin-left: 10px;
  padding: 5px 5px;
  &:nth-child(2) {
    margin-left: 7px;
  }
`;

export const Bold = styled.span`
  font-weight: 500;
`;

// Tabs
export const TabsWrapper = styled.ul`
  display: flex;
  margin: 0;
  padding: 0;
  width: 100%;
  color: #333;
  border-bottom: 1px solid ${gray};
  border-radius: 0;
`;

export const Tab = styled.li`
  padding: 0;
  margin: 0;
  list-style-type: none;
  font-size: 1em;
  line-height: 1.428571429;
`;

export const TabButton = styled(Button)`
  display: flex;
  align-items: center;
  min-height: 32px;
  padding: 0.7em 1.2em;
  margin: 0;
  cursor: pointer;
  color: ${gray};
  text-decoration: none;
  border-bottom: 2px solid transparent;
  &:hover {
    background-color: ${gray};
    color: white;
    border-bottom: 2px solid ${gray};
  }
  &:active {
    border-bottom: 2px solid ${baseColor};
  }
  &:disabled {
    background-color: white;
    border-bottom: 2px solid ${baseColor};
    color: black;
  }
`;

export const TabLink = TabButton.withComponent('a');
export const TabLinkActive = styled(TabButton.withComponent('a'))`
  &, &:hover {
    cursor: default;
    background-color: white;
    border-bottom: 2px solid ${baseColor};
    color: black;
  }
`;

export const TabButtonDisabled = styled(TabButton)`
  &:hover {
    cursor: not-allowed;
    color: ${gray};
    background-color: inherit;
    border-bottom: inherit;
  }
`;

export const TabIcon = styled.i`
  padding-right: .6em;
  &:before {
    font-size: 1.3em;
  }
`;

export const TabTitle = styled.span`
  padding-bottom: 4px;
  font-weight: 400;
`;

export const Description = styled.div`
  padding: 10px 0;
`;

export const Subtitle = styled.p`
  text-align: center;
  margin: -10px 0 20px;
`;
