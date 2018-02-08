import React from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';

import web3Connect from '../AccountProvider/web3Connect';
import makeSelectAccountData from '../AccountProvider/selectors';
import Container from '../../components/Container';
import Balances from '../../components/Dashboard/Balances';
import Tabs from '../../components/Dashboard/Tabs';

import { OVERVIEW, WALLET, setActiveTab } from './actions';
import messages from './messages';
import { getActiveTab } from './selectors';

import { ABI_TOKEN_CONTRACT, ABI_POWER_CONTRACT, conf } from '../../app.config';

const confParams = conf();

const TABS = [
  {
    name: OVERVIEW,
    title: <FormattedMessage {...messages[OVERVIEW]} />,
    to: '/dashboard',
    icon: 'fa-tachometer',
    onlyActiveOnIndex: true,
  },
  {
    name: WALLET,
    title: <FormattedMessage {...messages[WALLET]} />,
    to: '/dashboard/wallet',
    icon: 'fa-money',
  },
  // {
  //   name: EXCHANGE,
  //   title: <FormattedMessage {...messages[EXCHANGE]} />,
  //   to: '/dashboard/exchange',
  //   icon: 'fa-exchange',
  // },
  // {
  //   name: INVEST,
  //   title: <FormattedMessage {...messages[INVEST]} />,
  //   to: '/dashboard/invest',
  //   icon: 'fa-line-chart',
  // },
];

class DashboardRoot extends React.Component {
  constructor(props) {
    super(props);

    this.token = this.web3.eth.contract(ABI_TOKEN_CONTRACT).at(confParams.ntzAddr);
    this.power = this.web3.eth.contract(ABI_POWER_CONTRACT).at(confParams.pwrAddr);
  }

  get web3() {
    return this.props.web3Redux.web3;
  }

  render() {
    const { account } = this.props;
    const weiBalance = this.web3.eth.balance(account.signerAddr);
    const babzBalance = this.token.balanceOf(account.signerAddr);

    // before crowdsale end, disable INVEST tab on production
    return (
      <Container>
        <Tabs
          tabs={TABS}
          {...this.props}
        />
        <Balances
          babzBalance={babzBalance}
          weiBalance={weiBalance}
        />
        {this.props.children}
      </Container>
    );
  }
}
DashboardRoot.propTypes = {
  children: PropTypes.any,
  account: PropTypes.object,
  web3Redux: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  activeTab: getActiveTab(),
  account: makeSelectAccountData(),
});

export default web3Connect(
  mapStateToProps,
  () => ({ setActiveTab }),
)(DashboardRoot);
