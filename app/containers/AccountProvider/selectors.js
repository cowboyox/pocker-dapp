import EthUtil from 'ethereumjs-util';
import { createSelector } from 'reselect';
import { READY_STATE } from './actions';

/**
 * Direct selector to the accountProvider state domain
 */
const selectAccount = (state) => state.get('account');

/**
 * Other specific selectors
 */

const makeBlockySelector = () => createSelector(
  selectAccount,
  (account) => account.get('blocky'),
);

const makeNickNameSelector = () => createSelector(
  selectAccount,
  (account) => account.get('nickName'),
);

const makeSelectAccountData = () => createSelector(
  selectAccount,
  (account) => account.toJS()
);

const makeSignerAddrSelector = () => createSelector(
  selectAccount,
  // (account) => account.get('signerAddr'),
  (account) => {
    if (account && account.get('privKey')) {
      const privKeyBuffer = new Buffer(account.get('privKey').replace('0x', ''), 'hex');
      return `0x${EthUtil.privateToAddress(privKeyBuffer).toString('hex')}`;
    }
    return null;
  }
);

const makeSelectIsWeb3Connected = () => createSelector(
  selectAccount,
  (account) => account.get('web3ReadyState') === READY_STATE.OPEN
);

const makeSelectWeb3ErrMsg = () => createSelector(
  selectAccount,
  (account) => account.get('web3ErrMsg')
);

const makeSelectEmail = () => createSelector(
  selectAccount,
  (account) => account.get('email')
);

const makeSelectPrivKey = () => createSelector(
  selectAccount,
  (account) => account.get('privKey')
);

const makeSelectProxyAddr = () => createSelector(
  selectAccount,
  (account) => account.get('proxy')
);


/**
 * Default selector used by AccountProvider
 */
export default makeSelectAccountData;
export {
  selectAccount,
  makeBlockySelector,
  makeNickNameSelector,
  makeSignerAddrSelector,
  makeSelectAccountData,
  makeSelectPrivKey,
  makeSelectProxyAddr,
  makeSelectEmail,
  makeSelectIsWeb3Connected,
  makeSelectWeb3ErrMsg,
};
