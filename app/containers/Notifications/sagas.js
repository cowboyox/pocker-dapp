import React from 'react';
import { LOCATION_CHANGE } from 'react-router-redux';
import { put, takeEvery, take, select, call } from 'redux-saga/effects';
import { delay } from 'redux-saga';

import * as storageService from '../../services/sessionStorage';

import WithLoading from '../../components/WithLoading';

import {
  formatNtz,
  formatEth,
} from '../../utils/amountFormatter';

import {
  NOTIFY_CREATE,
  NOTIFY_REMOVE,
  notifyAdd,
  notifyDelete,
  notifyRemoving,
} from './actions';

import {
  SET_AUTH,
  ACCOUNT_LOADED,
  INJECT_ACCOUNT_UPDATE,
  ETH_TRANSFER_SUCCESS,
  PROXY_EVENTS,
  CONTRACT_TX_SEND,
  CONTRACT_TX_SUCCESS,
  CONTRACT_TX_ERROR,
  CONTRACT_EVENTS,
} from '../AccountProvider/actions';

import { makeLatestHandSelector } from '../Table/selectors';

import { getWeb3 } from '../AccountProvider/utils';

import {
  TRANSFER_ETH,
  TRANSFER_NTZ,
  loggedInSuccess,
  noWeb3Danger,
  firstLogin,
  notLoggedIn,
  transferPending,
  transferSuccess,
} from './constants';

import { waitForTx } from '../../utils/waitForTx';

function* createTempNotification(note) {
  yield put(notifyAdd(note));
  // TODO don't call removeNotification if NOTIFY_REMOVE is already dispatched
  // wait for NOTIFY_REMOVE to be dispatched by the user
  // or call NOTIFY_REMOVE after timeout
  yield delay(3000);
  yield* removeNotification({ txId: note.txId });
}

function* createPersistNotification(note) {
  yield put(notifyAdd(note));
}

function* createNotification(action) {
  if (action.notifyType === TRANSFER_ETH) {
    yield takeEvery(ETH_TRANSFER_SUCCESS, transferPendingEth);
  }
  if (action.notifyType === TRANSFER_NTZ) {
    yield takeEvery(CONTRACT_TX_SUCCESS, transferPendingNtz);
  }
}

function* removeNotification({ txId }) {
  // trigger remove note animation
  yield put(notifyRemoving(txId));
  // remove element after animation finishes
  yield delay(400);
  yield put(notifyDelete(txId));
}

function* authNotification({ newAuthState }) {
  const { loggedIn } = newAuthState;
  if (loggedIn) {
    yield* removeNotification({ txId: notLoggedIn.txId });
    yield* removeNotification({ txId: firstLogin.txId });
    yield* createTempNotification(loggedInSuccess);
  }
}

function* injectedWeb3Notification({ payload: { isLocked } }) {
  if (!isLocked) {
    yield call(delay, 2000);
    const state = yield select();
    const injected = yield call([state, state.getIn], ['account', 'injected']);
    if (!injected) {
      yield* createPersistNotification(noWeb3Danger);
    }
  }
}

function* injectedWeb3NotificationDismiss({ payload: injected }) {
  if (typeof injected === 'string') {
    yield put(notifyDelete(noWeb3Danger.txId));
  }
}

function getIsRebuy(tableAddr, handId) {
  return !!storageService.getItem(`rebuyModal[${tableAddr}${handId}]`);
}

function* tableNotifications(sendAction) {
  const state = yield select();
  const table = yield call([state, state.get], 'table');
  const isLocked = yield call([state, state.getIn], ['account', 'isLocked']);
  const tableAddr = sendAction.payload.args[0];

  if (table.has(tableAddr) && sendAction.payload.methodName === 'transData') {
    const handId = yield call(makeLatestHandSelector(), state, { params: { tableAddr } });
    const isRebuy = yield call(getIsRebuy, tableAddr, handId);

    const pendingNotification = {
      txId: tableAddr,
      category: isRebuy ? 'Rebuy' : 'Table joining',
      details: <span><WithLoading isLoading loadingSize="14px" type="inline" /> {tableAddr.substring(2, 8)}</span>,
      dismissable: true,
      date: new Date(),
      type: 'info',
    };

    if (isLocked) { // do not need to show notification for shark account here
      yield* createPersistNotification(pendingNotification);
    }

    while (true) { // eslint-disable-line no-constant-condition
      const finalAction = yield take([CONTRACT_TX_ERROR, CONTRACT_TX_SUCCESS]);
      try {
        if (tableAddr === finalAction.payload.args[0]) {
          if (finalAction.type === CONTRACT_TX_SUCCESS) {
            if (!isLocked) { // show notification for sharks (after submitting tx in metamask)
              yield* createPersistNotification(pendingNotification);
            }

            const web3 = yield call(getWeb3);
            yield call(waitForTx, web3, finalAction.payload.txHash);
            yield* removeNotification({ txId: tableAddr });
            yield* createTempNotification({
              txId: tableAddr,
              category: isRebuy ? 'Successful rebuy' : 'You are joined table',
              details: 'Good luck!',
              dismissable: true,
              date: new Date(),
              type: 'success',
            });
          } else {
            throw finalAction;
          }
        }
      } catch (errorAction) {
        const { payload: { error } } = errorAction;
        yield* removeNotification({ txId: tableAddr });

        const errorNotification = {
          txId: tableAddr,
          dismissable: true,
          date: new Date(),
          type: 'danger',
          category: isRebuy ? 'Rebuy' : 'Table joining',
          details: 'Something goes wrong, try again',
        };

        if (typeof error === 'string' && error.indexOf('MetaMask Tx Signature: User denied') > -1) {
          yield* createTempNotification({
            ...errorNotification,
            category: 'Denied by user',
            details: '',
          });
        } else {
          yield* createTempNotification(errorNotification);
        }
      }
    }
  }
}

function* visitorModeNotification({ payload: { pathname = '' } }) {
  const state = yield select();
  const loggedIn = yield call([state, state.getIn], ['account', 'loggedIn']);
  if (!loggedIn) {
    const isNotificationVisible = !pathname.match(/register|login/);
    if (isNotificationVisible) {
      yield* createPersistNotification(notLoggedIn);
    } else {
      yield* removeNotification({ txId: notLoggedIn.txId });
    }
  }
}

function* transferPendingNtz({ payload }) {
  const { args, txHash, methodName } = payload;
  if (methodName === 'transfer') {
    const note = transferPending;
    note.txId = txHash;
    note.details = `Sending ${formatNtz(args[1])} NTZ`;
    yield* createPersistNotification(note);
  }
  yield takeEvery(CONTRACT_EVENTS, transferSuccessNtz);
}

function* transferSuccessNtz({ payload }) {
  const { args, transactionHash, event } = payload[0];
  if (event === 'Transfer') {
    yield* removeNotification({ txId: transactionHash });
    const note = transferSuccess;
    note.details = `Sent ${formatNtz(args.value)} NTZ`;
    yield* createTempNotification(note);
  }
}

function* transferPendingEth({ payload }) {
  const { txHash, amount } = payload;
  const note = transferPending;
  note.txId = txHash;
  note.details = `Sending ${formatEth(amount)} ETH`;
  yield* createPersistNotification(note);
  yield takeEvery(PROXY_EVENTS, transferSuccessEth);
}

function* transferSuccessEth({ payload }) {
  const { args, transactionHash, event } = payload[0];
  if (event === 'Withdrawal') {
    yield* removeNotification({ txId: transactionHash });
    const note = transferSuccess;
    note.details = `Sent ${formatEth(args.value)} ETH`;
    yield* createTempNotification(note);
  }
}

export function* notificationsSaga() {
  yield takeEvery(LOCATION_CHANGE, visitorModeNotification);
  yield takeEvery(SET_AUTH, authNotification);
  yield takeEvery(ACCOUNT_LOADED, injectedWeb3Notification);
  yield takeEvery(INJECT_ACCOUNT_UPDATE, injectedWeb3NotificationDismiss);
  yield takeEvery(NOTIFY_CREATE, createNotification);
  yield takeEvery(NOTIFY_REMOVE, removeNotification);
  yield takeEvery(CONTRACT_TX_SEND, tableNotifications);

  yield call(visitorModeNotification, {
    payload: {
      pathname: window.location.pathname,
    },
  });
}

export default [
  notificationsSaga,
];
