import React from 'react';
import PropTypes from 'prop-types';

import { ETH, NTZ } from '../../containers/Dashboard/actions';
import TransferDialog from '../../containers/TransferDialog';

import H2 from '../H2';

import {
  Pane,
  Section,
  SendContainer,
  TabIcon as ModeIcon,
} from './styles';
import SectionReceive from './SectionReceive';

function Wallet(props) {
  const {
    account,
    ethBalance,
    nutzBalance,
    handleNTZTransfer,
    handleETHTransfer,
    estimateNTZTransfer,
    estimateETHTransfer,
    amountUnit,
    floor,
  } = props;

  return (
    <Pane name="dashboard-wallet">
      <Section
        style={{ alignSelf: 'center', maxWidth: 480 }}
        name="wallet-receive"
      >
        <H2><ModeIcon className="fa fa-inbox" />Deposit</H2>
        <SectionReceive {...{ account, ethBalance, nutzBalance, floor }} />
      </Section>

      <Section name="wallet-send">
        <H2><ModeIcon className="fa fa-send" />Transfer</H2>
        <SendContainer>
          {amountUnit === ETH && ethBalance &&
            <TransferDialog
              handleTransfer={handleETHTransfer}
              estimateTransfer={estimateETHTransfer}
              maxAmount={ethBalance.lt(1) ? ethBalance : ethBalance.round(4)}
              type="token"
              placeholder="0.00"
              messages={props.messages}
              amountUnit={ETH}
            />
          }

          {amountUnit === NTZ && nutzBalance &&
            <TransferDialog
              handleTransfer={handleNTZTransfer}
              estimateTransfer={estimateNTZTransfer}
              maxAmount={nutzBalance.round(4)}
              type="token"
              placeholder="0"
              messages={props.messages}
              amountUnit={NTZ}
            />
          }
        </SendContainer>
      </Section>
    </Pane>
  );
}

Wallet.propTypes = {
  ethBalance: PropTypes.object,
  nutzBalance: PropTypes.object,
  handleNTZTransfer: PropTypes.func,
  estimateNTZTransfer: PropTypes.func,
  handleETHTransfer: PropTypes.func,
  estimateETHTransfer: PropTypes.func,
  amountUnit: PropTypes.string,
  messages: PropTypes.object,
  account: PropTypes.object.isRequired,
  floor: PropTypes.object.isRequired,
};

export default Wallet;
