import { fromJS } from 'immutable';

import {
  ACCOUNT_LOADED,
  CONTRACT_EVENTS,
  PROXY_EVENTS,
  CONTRACT_TX_SUCCESS,
  ETH_TRANSFER_SUCCESS,
  CONTRACT_TX_ERROR,
} from '../AccountProvider/actions';

import {
  MODAL_DISMISS,
} from '../App/actions';

import { composeReducers } from '../../utils/composeReducers';

import { conf } from '../../app.config';

const confParams = conf();

/**
 * interface DashboardEvent {
 *   unit: 'eth' | 'ntz';
 *   value: string;
 *   blockNumber?: number;
 *   address: string;
 *   type: 'income' | 'outcome' | 'pending';
 *   transactionHash: string;
 *   timestamp?: number;
 *   pending?: boolean;
 * }
 */
const initialState = fromJS({
  proxy: null,
  failedTx: null,
  events: null,
});

function dashboardReducer(state = initialState, action) {
  switch (action.type) {
    case ACCOUNT_LOADED:
      return state.set('proxy', action.data.proxy);

    case CONTRACT_TX_SUCCESS:
      return addNTZPending(
        initEvents(state),
        action.payload
      );

    case ETH_TRANSFER_SUCCESS:
      return addETHPending(
        initEvents(state),
        action.payload
      );

    case CONTRACT_TX_ERROR:
      return state.set('failedTx', fromJS(action.payload));

    case MODAL_DISMISS:
      return state.set('failedTx', null);

    case PROXY_EVENTS:
      return action.payload.reduce(
        composeReducers(addProxyEvent, completePending),
        initEvents(state)
      );

    case CONTRACT_EVENTS:
      return action.payload.reduce(
        composeReducers(addNTZContractEvent, completePending),
        initEvents(state)
      );

    default:
      return state;
  }
}

export default dashboardReducer;

function initEvents(state) {
  if (state.get('events') === null) {
    return state.set('events', fromJS({}));
  }

  return state;
}

function completePending(state, event) {
  return state.deleteIn(['events', event.transactionHash]);
}

function addETHPending(state, { txHash, amount, address }) {
  return state.setIn(
    ['events', txHash],
    fromJS({
      address,
      value: amount.toString ? amount.toString() : amount,
      type: 'outcome',
      unit: 'eth',
      pending: true,
      transactionHash: txHash,
    }),
  );
}

function addNTZPending(state, { methodName, args, txHash }) {
  if (methodName === 'transfer' && args[0] !== confParams.ntzAddr) {
    return state.setIn(
      ['events', txHash],
      fromJS({
        address: args[0],
        value: args[1].toString ? args[1].toString() : args[1],
        type: 'outcome',
        unit: 'ntz',
        pending: true,
        transactionHash: txHash,
      }),
    );
  } else if (methodName === 'transfer' && args[0] === confParams.ntzAddr) {
    return state.setIn(
      ['events', txHash],
      fromJS({
        address: confParams.ntzAddr,
        value: args[1].toString ? args[1].toString() : args[1],
        type: 'outcome',
        unit: 'ntz',
        pending: true,
        transactionHash: txHash,
      }),
    );
  } else if ( // eth claim
    methodName === 'transferFrom' &&
    args[0] === confParams.ntzAddr &&
    args[1] === state.get('proxy') &&
    args[2] === 0
  ) {
    return state.setIn(
      ['events', txHash],
      fromJS({
        address: confParams.ntzAddr,
        type: 'income',
        unit: 'eth',
        pending: true,
        transactionHash: txHash,
      }),
    );
  }

  return state;
}

function addProxyEvent(state, event) {
  const isReceived = event.event === 'Received';
  return state.setIn(
    ['events', event.transactionHash],
    makeDashboardEvent(event, {
      address: isReceived ? event.args.sender : event.address,
      unit: 'eth',
      type: isReceived ? 'income' : 'outcome',
    }),
  );
}

function addNTZContractEvent(state, event) {
  if (event.event === 'Transfer') {
    const isIncome = event.args.to === state.get('proxy');
    return state.setIn(
      ['events', event.transactionHash],
      makeDashboardEvent(event, {
        address: isIncome ? event.args.from : event.args.to,
        unit: 'ntz',
        type: isIncome ? 'income' : 'outcome',
      }),
    );
  } else if (event.event === 'Sell') {
    return state.setIn(
      ['events', event.transactionHash],
      makeDashboardEvent(event, {
        address: confParams.ntzAddr,
        unit: 'ntz',
        type: 'outcome',
      }),
    );
  } else if (event.event === 'Purchase') {
    return state.setIn(
      ['events', event.transactionHash],
      makeDashboardEvent(event, {
        address: state.get('proxy'),
        unit: 'ntz',
        type: 'income',
      }),
    );
  }

  return state;
}

function makeDashboardEvent(event, fields) {
  return fromJS({
    blockNumber: event.blockNumber,
    transactionHash: event.transactionHash,
    value: event.args.value,
    timestamp: event.timestamp,
    ...fields,
  });
}
