import React from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';

import web3Connect from '../AccountProvider/web3Connect';
import makeSelectAccountData from '../AccountProvider/selectors';
import {
  OVERVIEW,
  WALLET,
  EXCHANGE,
  INVEST,
  setActiveTab,
} from './actions';
import messages from './messages';
import {
  getActiveTab,
} from './selectors';

import Container from '../../components/Container';
import Balances from '../../components/Dashboard/Balances';

import PanesRoot from '../../components/Dashboard/PanesRoot';
import Tabs from '../../components/Dashboard/Tabs';

import Invest from './Invest';
import Overview from './Overview';
import Wallet from './Wallet';
import Exchange from './Exchange';
import InvestTour from './InvestTour';

import {
  ABI_TOKEN_CONTRACT,
  ABI_POWER_CONTRACT,
  MAIN_NET_GENESIS_BLOCK,
  conf,
} from '../../app.config';

const confParams = conf();

const PANES = {
  [OVERVIEW]: Overview,
  [WALLET]: Wallet,
  [EXCHANGE]: Exchange,
  [INVEST]: Invest,
};

const TABS = [
  {
    name: OVERVIEW,
    title: <FormattedMessage {...messages[OVERVIEW]} />,
    icon: 'fa-tachometer',
  },
  {
    name: WALLET,
    title: <FormattedMessage {...messages[WALLET]} />,
    icon: 'fa-money',
  },
  {
    name: EXCHANGE,
    title: <FormattedMessage {...messages[EXCHANGE]} />,
    icon: 'fa-exchange',
  },
  {
    name: INVEST,
    title: <FormattedMessage {...messages[INVEST]} />,
    icon: 'fa-line-chart',
  },
];

class DashboardRoot extends React.Component {
  constructor(props) {
    super(props);

    this.web3 = props.web3Redux.web3;
    this.token = this.web3.eth.contract(ABI_TOKEN_CONTRACT).at(confParams.ntzAddr);
    this.power = this.web3.eth.contract(ABI_POWER_CONTRACT).at(confParams.pwrAddr);
  }

  render() {
    const { account } = this.props;
    const weiBalance = this.web3.eth.balance(account.proxy);
    const babzBalance = this.token.balanceOf(account.proxy);
    const pwrBalance = this.power.balanceOf(account.proxy);

    // before crowdsale end, disable INVEST tab on production
    const disabledTabs = conf().firstBlockHash === MAIN_NET_GENESIS_BLOCK ? [INVEST] : [];
    return (
      <Container>
        <Tabs
          tabs={TABS}
          disabledTabs={disabledTabs}
          {...this.props}
        />
        <Balances
          babzBalance={babzBalance}
          pwrBalance={pwrBalance}
          weiBalance={weiBalance}
        />
        <PanesRoot
          panes={PANES}
          paneType={this.props.activeTab}
          paneProps={this.props}
        />
        <InvestTour />
      </Container>
    );
  }
}
DashboardRoot.propTypes = {
  activeTab: PropTypes.string,
  account: PropTypes.object,
  web3Redux: PropTypes.any,
};

const mapDispatchToProps = () => ({
  setActiveTab,
});

const mapStateToProps = createStructuredSelector({
  activeTab: getActiveTab(),
  account: makeSelectAccountData(),
});

export default web3Connect(
  mapStateToProps,
  mapDispatchToProps,
)(DashboardRoot);
