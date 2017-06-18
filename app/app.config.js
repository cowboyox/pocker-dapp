/**
 * Copyright (c) 2017 Acebusters
 * Use of this source code is governed by an ISC
 * license that can be found in the LICENSE file.
*/

const DEFAULT_REF_CODE = '00000000';

export function conf() {
  let sub = '';
  if (window && window.location && window.location.host) {
    sub = window.location.host.split('.')[0];
  }
  // ### PRODUCTION ENVIRONMENT CONFIG
  if (sub === 'app') {
    return {
      defaultRefCode: DEFAULT_REF_CODE,
      gethUrl: '',
      oracleUrl: '',
      txUrl: '',
      accountUrl: '',
      ntzAddr: '',
      accountFactory: '',
      tableFactory: '',
      sentryDSN: 'https://8c3e021848b247ddaf627c8040f94e07@sentry.io/153017',
    };
  }

  // ### STAGING ENVIRONMENT CONFIG
  if (sub === 'beta') {
    return {
      defaultRefCode: DEFAULT_REF_CODE,
      gethUrl: 'ws://rinkeby.acebusters.com:8546',
      oracleUrl: 'https://v83iq1161a.execute-api.eu-west-1.amazonaws.com/v0',
      txUrl: 'https://h5fb9klhzc.execute-api.eu-west-1.amazonaws.com/v0',
      accountUrl: 'https://vps13t4f7e.execute-api.eu-west-1.amazonaws.com/v0',
      ntzAddr: '0xb0fb6369deb053eeaf3daee3a53e89bcbf1543ce',
      accountFactory: '0x2e7b835760765e6bef9e05a954ac4e901448d105',
      tableFactory: '0xd56fb602475a6bf067e5998bd02764df5219bcb5',
      sentryDSN: 'https://8c3e021848b247ddaf627c8040f94e07@sentry.io/153017',
    };
  }

  // ### SANDBOX ENVIRONMENT CONFIG
  return {
    defaultRefCode: DEFAULT_REF_CODE,
    gethUrl: 'ws://geth.ocolin.com:8546',
    oracleUrl: 'https://evm4rumeob.execute-api.eu-west-1.amazonaws.com/v0',
    txUrl: 'https://khengvfg6c.execute-api.eu-west-1.amazonaws.com/v0',
    accountUrl: 'https://hsqkzjp3m8.execute-api.eu-west-1.amazonaws.com/v0',
    ntzAddr: '0x2a27062954de13412f33759d6d2fa06a57411884',
    accountFactory: '0xf8fc7db81608d5c641f7d3c4e8b47eecb8a3dfb8',
    tableFactory: '0xcea862d3a13ce089d3c00fc407dc142c206cab9e',
    sentryDSN: 'https://8c3e021848b247ddaf627c8040f94e07@sentry.io/153017',
  };
}
export const signerAddr = '0xdb2fdaf5b80c6a4c408e51b36ce7bbdd0c0852c4';
export const blocky = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAADqklEQVR4Xu3d4XUTMRBFYbkFSkgtaQFKgBZSglsIJUAL1EIJaSHU4P10jpjk8pun1b65fjPryPbt7fXX+4J/P3+/gNql37/efRFYYfr93wIAqr/WCoASwAhCtSZgCYAFKAFKAETI5CVAQyARVAsg+xoCx0/BWP/x918CIAENgQ2BiJDJGwIbAomgWgDZ1xA4fgjC+o+//xIACWgIbAhEhEzeENgQSARxC6Cr/wd/TtX9q15fwXr9AFAHUR8Ah2cIrB/LAyAAGCJZoBYg7m3QlgAlwAaMri9RAlz3bouyBCgBtoB0dZES4Kpzm3QlQAmwCaVry5QA13zbpioBSoBtMF1ZqAS44tpGTQlQAmzE6fGlSoDHPduqKAFKgK1APbrY7f78RN8PcJrgR2/4o/1/PZIWAMOJCIDhBdTtB4A6OFwfAMMLqNsPAHVwuD4AhhdQtx8A6uBwfQAML6BuPwDUweH6ABheQN1+AKiDw/UBMLyAuv0AUAeH6wNgeAF1+wGgDg7XjwdAb+D0eYTT+9frHz8PoDcQAPaDHQGALeA0wHr9AAiAs2cCleBaQC0AX8MmPw2wXr8WYPXnbwrVBAuA4d8TGAD4wRA1EAOgBNACaITp9QPg8CeDAsB++VT9awjECNACaILp9QMgAHojSBjQV2AJ0FOA8MdPIbUAst9/M+jTJwD6/+nl2oKOJ8CnryAaEABo4HR5AEyvIO4/ANDA6fIAmF5B3H8AoIHT5QEwvYK4/wBAA6fLA2B6BXH/AYAGTpcHwPQK4v4DAA2cLg+A6RXE/QcAGjhdHgDTK4j7Pw4A7p/leqBCN6AF0Ourns8D6AZUHwDmYACYf3wmDy/P8gBAC2sBaKDKawHmYAlg/tUC0D+WlwBmYQlg/pUA6B/LSwCzsAQw/0oA9I/lJYBZWAKYfyUA+sfyEsAsLAHMvxIA/WN5CWAWlgDm3/wEWGu9iwf35yeRr5c/f0n/9vqL9Cr+8uMbLXHav1sAUP1WAJQARFAJUAsggLSF1gLI/lULOB1hDYE2RJcAJUCPgcJATwE9BQg/63QLrQVQ+RoCjxPcENgQiK9hkzcDNAMQQc0AvRNIAPVOYH8NJIB6CiD7PsBTwB1/NQz9Y3kngszCTgSZf/NPBJUARkAfDzf/WF0LMAtrAeZfLQD9Y3kJYBaWAOZfCYD+sbwEMAtLAPOvBED/WF4CmIUlgPlXAqB/LC8BzMISwPwrAdA/lpcAZmEJYP6VAOgfy0sAs/Af1PKArkvqmhoAAAAASUVORK5CYII=';
export const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king', 'ace'];
export const valuesShort = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];
export const suits = ['c', 'd', 'h', 's'];
export const timeoutSeconds = 60;

// showStatus messages ***commented out means they are not implemented yet***
export const STATUS_MSG = {
  active: {
    type: 'seat',
    style: 'info',
    msg: 'active',
  },
  // allIn: {
  //   type: 'action',
  //   style: 'warning',
  //   msg: 'all-in',
  // },
  bet: {
    type: 'action',
    style: 'danger',
    msg: 'bet',
  },
  blindSmall: {
    type: 'action',
    style: 'info',
    msg: 'posted SB',
  },
  blindBig: {
    type: 'action',
    style: 'info',
    msg: 'posted BB',
  },
  call: {
    type: 'action',
    style: 'success',
    msg: 'call',
  },
  check: {
    type: 'action',
    style: 'success',
    msg: 'check',
  },
  fold: {
    type: 'action',
    style: 'info',
    msg: 'fold',
  },
  raise: {
    type: 'action',
    style: 'danger',
    msg: 'raise',
  },
  sitOut: {
    type: 'seat',
    style: 'info',
    msg: 'sit-out',
  },
  sittingIn: {
    type: 'seat',
    style: 'info',
    msg: 'sitting-in',
  },
  standingUp: {
    type: 'seat',
    style: 'info',
    msg: 'standing-up',
  },
  waiting: {
    type: 'seat',
    style: 'info',
    msg: 'waiting',
  },
  // winner: {
  //   type: 'action',
  //   style: 'warning',
  //   msg: 'winner',
  // },
};

export const ABI_TOKEN_CONTRACT = [{ constant: false, inputs: [{ name: '_spender', type: 'address' }, { name: '_value', type: 'uint256' }], name: 'approve', outputs: [{ name: 'success', type: 'bool' }], payable: false, type: 'function' }, { constant: true, inputs: [], name: 'totalSupply', outputs: [{ name: '', type: 'uint256' }], payable: false, type: 'function' }, { constant: false, inputs: [{ name: '_value', type: 'uint256' }], name: 'revoke', outputs: [{ name: 'success', type: 'bool' }], payable: false, type: 'function' }, { constant: false, inputs: [{ name: '_from', type: 'address' }, { name: '_to', type: 'address' }, { name: '_value', type: 'uint256' }], name: 'transferFrom', outputs: [{ name: 'success', type: 'bool' }], payable: false, type: 'function' }, { constant: true, inputs: [{ name: '_holder', type: 'address' }], name: 'balanceOf', outputs: [{ name: 'balance', type: 'uint256' }], payable: false, type: 'function' }, { constant: true, inputs: [], name: 'owner', outputs: [{ name: '', type: 'address' }], payable: false, type: 'function' }, { constant: false, inputs: [{ name: '_newOwner', type: 'address' }], name: 'changeOwner', outputs: [{ name: 'success', type: 'bool' }], payable: false, type: 'function' }, { constant: false, inputs: [{ name: '_to', type: 'address' }, { name: '_value', type: 'uint256' }], name: 'transfer', outputs: [{ name: 'success', type: 'bool' }], payable: false, type: 'function' }, { constant: true, inputs: [], name: 'baseUnit', outputs: [{ name: '', type: 'uint96' }], payable: false, type: 'function' }, { constant: false, inputs: [{ name: '_value', type: 'uint256' }], name: 'issue', outputs: [{ name: 'success', type: 'bool' }], payable: false, type: 'function' }, { constant: true, inputs: [{ name: '_holder', type: 'address' }, { name: '_spender', type: 'address' }], name: 'allowance', outputs: [{ name: 'remaining', type: 'uint256' }], payable: false, type: 'function' }, { inputs: [{ name: '_owner', type: 'address' }, { name: '_baseUnit', type: 'uint96' }], type: 'constructor' }, { anonymous: false, inputs: [{ indexed: true, name: 'from', type: 'address' }, { indexed: true, name: 'to', type: 'address' }, { indexed: false, name: 'value', type: 'uint256' }], name: 'Transfer', type: 'event' }, { anonymous: false, inputs: [{ indexed: true, name: 'to', type: 'address' }, { indexed: false, name: 'value', type: 'uint256' }], name: 'Issuance', type: 'event' }, { anonymous: false, inputs: [{ indexed: true, name: 'from', type: 'address' }, { indexed: false, name: 'value', type: 'uint256' }], name: 'Revoke', type: 'event' }, { anonymous: false, inputs: [{ indexed: true, name: 'owner', type: 'address' }, { indexed: true, name: 'spender', type: 'address' }, { indexed: false, name: 'value', type: 'uint256' }], name: 'Approval', type: 'event' }, { anonymous: false, inputs: [{ indexed: false, name: 'sender', type: 'address' }, { indexed: false, name: 'code', type: 'uint256' }], name: 'Error', type: 'event' }];
export const ABI_ACCOUNT_FACTORY = [{ constant: false, inputs: [{ name: '_oldSigner', type: 'address' }, { name: '_newSigner', type: 'address' }], name: 'handleRecovery', outputs: [], payable: false, type: 'function' }, { constant: true, inputs: [{ name: '', type: 'address' }], name: 'signerToController', outputs: [{ name: '', type: 'address' }], payable: false, type: 'function' }, { constant: true, inputs: [{ name: '', type: 'address' }], name: 'signerToProxy', outputs: [{ name: '', type: 'address' }], payable: false, type: 'function' }, { constant: false, inputs: [{ name: '_signer', type: 'address' }, { name: '_proxy', type: 'address' }, { name: '_controller', type: 'address' }], name: 'register', outputs: [], payable: false, type: 'function' }, { constant: true, inputs: [{ name: '_signer', type: 'address' }], name: 'getAccount', outputs: [{ name: '', type: 'address' }, { name: '', type: 'address' }, { name: '', type: 'uint96' }], payable: false, type: 'function' }, { constant: false, inputs: [{ name: '_signer', type: 'address' }, { name: '_recovery', type: 'address' }, { name: '_timeLock', type: 'uint256' }], name: 'create', outputs: [], payable: false, type: 'function' }, { anonymous: false, inputs: [{ indexed: true, name: 'signer', type: 'address' }, { indexed: false, name: 'proxy', type: 'address' }, { indexed: false, name: 'controller', type: 'address' }, { indexed: false, name: 'recovery', type: 'address' }], name: 'AccountCreated', type: 'event' }, { anonymous: false, inputs: [{ indexed: true, name: 'newSigner', type: 'address' }, { indexed: false, name: 'proxy', type: 'address' }, { indexed: false, name: 'oldSigner', type: 'address' }], name: 'AccountRecovered', type: 'event' }, { anonymous: false, inputs: [{ indexed: false, name: 'code', type: 'uint256' }], name: 'Error', type: 'event' }];
export const ABI_TABLE = [{ constant: true, inputs: [], name: 'active', outputs: [{ name: '', type: 'bool' }], payable: false, type: 'function' }, { constant: true, inputs: [{ name: '', type: 'uint256' }], name: 'seats', outputs: [{ name: 'senderAddr', type: 'address' }, { name: 'amount', type: 'uint96' }, { name: 'signerAddr', type: 'address' }, { name: 'exitHand', type: 'uint32' }], payable: false, type: 'function' }, { constant: false, inputs: [{ name: '_toggleReceipt', type: 'bytes' }], name: 'toggleActive', outputs: [], payable: false, type: 'function' }, { constant: false, inputs: [{ name: '_r', type: 'bytes32' }, { name: '_s', type: 'bytes32' }, { name: '_pl', type: 'bytes32' }], name: 'leave', outputs: [], payable: false, type: 'function' }, { constant: true, inputs: [], name: 'lastNettingRequestTime', outputs: [{ name: '', type: 'uint256' }], payable: false, type: 'function' }, { constant: true, inputs: [], name: 'lastHandNetted', outputs: [{ name: '', type: 'uint32' }], payable: false, type: 'function' }, { constant: false, inputs: [{ name: '_sender', type: 'address' }], name: 'payoutFrom', outputs: [], payable: false, type: 'function' }, { constant: false, inputs: [{ name: '_newBalances', type: 'bytes' }, { name: '_sigs', type: 'bytes' }], name: 'settle', outputs: [], payable: false, type: 'function' }, { constant: false, inputs: [{ name: '_r', type: 'bytes32' }, { name: '_s', type: 'bytes32' }, { name: '_pl', type: 'bytes32' }], name: 'withdrawRake', outputs: [], payable: false, type: 'function' }, { constant: false, inputs: [], name: 'payout', outputs: [], payable: false, type: 'function' }, { constant: false, inputs: [{ name: '_now', type: 'uint256' }], name: 'netHelp', outputs: [], payable: false, type: 'function' }, { constant: true, inputs: [], name: 'oracle', outputs: [{ name: '', type: 'address' }], payable: false, type: 'function' }, { constant: true, inputs: [{ name: '', type: 'uint256' }], name: 'hands', outputs: [{ name: 'claimCount', type: 'uint256' }], payable: false, type: 'function' }, { constant: false, inputs: [{ name: '_buyIn', type: 'uint96' }, { name: '_signerAddr', type: 'address' }, { name: '_pos', type: 'uint256' }], name: 'join', outputs: [], payable: false, type: 'function' }, { constant: true, inputs: [], name: 'getLineup', outputs: [{ name: '', type: 'uint256' }, { name: 'addresses', type: 'address[]' }, { name: 'amounts', type: 'uint256[]' }, { name: 'exitHands', type: 'uint96[]' }], payable: false, type: 'function' }, { constant: false, inputs: [{ name: '_bets', type: 'bytes' }, { name: '_sigs', type: 'bytes' }], name: 'submitBets', outputs: [{ name: '', type: 'uint256' }], payable: false, type: 'function' }, { constant: true, inputs: [], name: 'lastNettingRequestHandId', outputs: [{ name: '', type: 'uint32' }], payable: false, type: 'function' }, { constant: false, inputs: [], name: 'net', outputs: [], payable: false, type: 'function' }, { constant: true, inputs: [{ name: '', type: 'address' }], name: 'seatMap', outputs: [{ name: '', type: 'uint256' }], payable: false, type: 'function' }, { constant: true, inputs: [{ name: '_handId', type: 'uint96' }, { name: '_addr', type: 'address' }], name: 'getIn', outputs: [{ name: '', type: 'uint96' }], payable: false, type: 'function' }, { constant: true, inputs: [], name: 'smallBlind', outputs: [{ name: '', type: 'uint96' }], payable: false, type: 'function' }, { constant: true, inputs: [{ name: '_handId', type: 'uint96' }, { name: '_addr', type: 'address' }], name: 'getOut', outputs: [{ name: '', type: 'uint96' }, { name: '', type: 'uint256' }], payable: false, type: 'function' }, { constant: false, inputs: [{ name: '_buyIn', type: 'uint96' }], name: 'rebuy', outputs: [], payable: false, type: 'function' }, { constant: false, inputs: [{ name: '_dists', type: 'bytes' }, { name: '_sigs', type: 'bytes' }], name: 'submitDists', outputs: [{ name: '', type: 'uint256' }], payable: false, type: 'function' }, { constant: true, inputs: [], name: 'token', outputs: [{ name: '', type: 'address' }], payable: false, type: 'function' }, { inputs: [{ name: '_token', type: 'address' }, { name: '_oracle', type: 'address' }, { name: '_smallBlind', type: 'uint96' }, { name: '_seats', type: 'uint256' }], payable: false, type: 'constructor' }, { anonymous: false, inputs: [{ indexed: false, name: 'addr', type: 'address' }, { indexed: false, name: 'amount', type: 'uint256' }], name: 'Join', type: 'event' }, { anonymous: false, inputs: [{ indexed: false, name: 'hand', type: 'uint256' }], name: 'NettingRequest', type: 'event' }, { anonymous: false, inputs: [{ indexed: false, name: 'hand', type: 'uint256' }], name: 'Netted', type: 'event' }, { anonymous: false, inputs: [{ indexed: false, name: 'addr', type: 'address' }], name: 'Leave', type: 'event' }, { anonymous: false, inputs: [{ indexed: false, name: 'addr', type: 'address' }, { indexed: false, name: 'errorCode', type: 'uint256' }], name: 'Error', type: 'event' }];

export const ABI_CONTROLLER = [{ constant: true, inputs: [], name: 'newControllerPendingUntil', outputs: [{ name: '', type: 'uint96' }], payable: false, type: 'function' }, { constant: false, inputs: [{ name: '_r', type: 'bytes32' }, { name: '_s', type: 'bytes32' }, { name: '_pl', type: 'bytes32' }, { name: '_amount', type: 'uint256' }, { name: '_data', type: 'bytes' }], name: 'forward', outputs: [], payable: false, type: 'function' }, { constant: true, inputs: [], name: 'newRecoveryPendingUntil', outputs: [{ name: '', type: 'uint96' }], payable: false, type: 'function' }, { constant: true, inputs: [], name: 'signer', outputs: [{ name: '', type: 'address' }], payable: false, type: 'function' }, { constant: true, inputs: [], name: 'newController', outputs: [{ name: '', type: 'address' }], payable: false, type: 'function' }, { constant: true, inputs: [], name: 'lastNonce', outputs: [{ name: '', type: 'uint96' }], payable: false, type: 'function' }, { constant: true, inputs: [], name: 'version', outputs: [{ name: '', type: 'uint96' }], payable: false, type: 'function' }, { constant: true, inputs: [], name: 'newRecovery', outputs: [{ name: '', type: 'address' }], payable: false, type: 'function' }, { constant: false, inputs: [{ name: '_newController', type: 'address' }], name: 'signControllerChange', outputs: [], payable: false, type: 'function' }, { constant: false, inputs: [{ name: '_newRecovery', type: 'address' }], name: 'signRecoveryChange', outputs: [], payable: false, type: 'function' }, { constant: false, inputs: [], name: 'changeController', outputs: [], payable: false, type: 'function' }, { constant: true, inputs: [], name: 'timeLock', outputs: [{ name: '', type: 'uint96' }], payable: false, type: 'function' }, { constant: false, inputs: [], name: 'changeRecovery', outputs: [], payable: false, type: 'function' }, { constant: true, inputs: [], name: 'recovery', outputs: [{ name: '', type: 'address' }], payable: false, type: 'function' }, { constant: true, inputs: [], name: 'proxy', outputs: [{ name: '', type: 'address' }], payable: false, type: 'function' }, { constant: false, inputs: [{ name: '_r', type: 'bytes32' }, { name: '_s', type: 'bytes32' }, { name: '_pl', type: 'bytes32' }], name: 'changeSigner', outputs: [], payable: false, type: 'function' }, { inputs: [{ name: '_proxy', type: 'address' }, { name: '_signer', type: 'address' }, { name: '_recovery', type: 'address' }, { name: '_timeLock', type: 'uint96' }], payable: false, type: 'constructor' }, { anonymous: false, inputs: [{ indexed: false, name: 'action', type: 'bytes32' }], name: 'Event', type: 'event' }, { anonymous: false, inputs: [{ indexed: false, name: 'error', type: 'bytes32' }], name: 'Error', type: 'event' }];

export const ABI_TABLE_FACTORY = [{ constant: false, inputs: [{ name: '_newOwner', type: 'address' }], name: 'transfer', outputs: [], payable: false, type: 'function' }, { constant: true, inputs: [], name: 'getTables', outputs: [{ name: '', type: 'address[]' }], payable: false, type: 'function' }, { constant: true, inputs: [{ name: '_addr', type: 'address' }], name: 'isOwner', outputs: [{ name: '', type: 'bool' }], payable: false, type: 'function' }, { constant: true, inputs: [{ name: '', type: 'uint256' }], name: 'tables', outputs: [{ name: '', type: 'address' }], payable: false, type: 'function' }, { constant: true, inputs: [], name: 'owner', outputs: [{ name: '', type: 'address' }], payable: false, type: 'function' }, { constant: false, inputs: [{ name: '_smallBlind', type: 'uint96' }, { name: '_seats', type: 'uint256' }], name: 'create', outputs: [{ name: '', type: 'address' }], payable: false, type: 'function' }, { constant: true, inputs: [], name: 'tokenAddress', outputs: [{ name: '', type: 'address' }], payable: false, type: 'function' }, { constant: true, inputs: [], name: 'oracleAddress', outputs: [{ name: '', type: 'address' }], payable: false, type: 'function' }, { constant: false, inputs: [{ name: '_token', type: 'address' }, { name: '_oracle', type: 'address' }], name: 'configure', outputs: [], payable: false, type: 'function' }];

export const ABI_BET = [{ name: 'bet', type: 'function', inputs: [{ type: 'uint' }, { type: 'uint' }] }];
export const checkABIs = {
  preflop: [{ name: 'checkPre', type: 'function', inputs: [{ type: 'uint' }, { type: 'uint' }] }],
  flop: [{ name: 'checkFlop', type: 'function', inputs: [{ type: 'uint' }, { type: 'uint' }] }],
  turn: [{ name: 'checkTurn', type: 'function', inputs: [{ type: 'uint' }, { type: 'uint' }] }],
  river: [{ name: 'checkRiver', type: 'function', inputs: [{ type: 'uint' }, { type: 'uint' }] }],
};

export const ABI_FOLD = [{ name: 'fold', type: 'function', inputs: [{ type: 'uint' }, { type: 'uint' }] }];
export const ABI_SIT_OUT = [{ name: 'sitOut', type: 'function', inputs: [{ type: 'uint' }, { type: 'uint' }] }];
export const ABI_SHOW = [{ name: 'show', type: 'function', inputs: [{ type: 'uint' }, { type: 'uint' }] }];
export const ABI_LEAVE = [{ name: 'leave', type: 'function', inputs: [{ type: 'uint' }, { type: 'uint' }] }];
export const ABI_DIST = [{ name: 'distribution', type: 'function', inputs: [{ type: 'uint' }, { type: 'uint' }, { type: 'bytes32[]' }] }];
export const TIMEOUT_PERIOD = 179;

// chip values and colors
export const chipValues = [
  [5000, '#f056c5'],
  [1000, '#e7e401'],
  [500, '#774ac1'],
  [100, '#ac2a2a'],
  [50, '#328eee'],
  [10, '#745f2a'],
  [1, '#FFFFFF'],
];

export const SEAT_COORDS = {
  2: [
    [-20, 60],
    [120, 60],
  ],
  4: [
    [30, -40, 0],
    [70, -40, 0],
    [70, 150, 1],
    [30, 150, 0],
  ],
  6: [
    [30, -40, 0],
    [70, -40, 0],
    [120, 60, 0],
    [70, 150, 1],
    [30, 150, 0],
    [-20, 60, 0],
  ],
  8: [
    [12, -30, 0],
    [44, -30, 0],
    [75, -30, 0],
    [110, 65, 0],
    [75, 140, 0],
    [44, 140, 0],
    [12, 140, 0],
    [-12, 65, 0],
  ],
  10: [
    [18, -40],
    [120, 90],
    [18, 150],
    [-20, 90],
    [-20, 10],
    [82, 150],
    [82, -40],
    [120, 10],
    [50, -40],
    [50, 150]],
};

export const AMOUNT_COORDS = {
  2: [[-295, 0], [275, 10]],
  4: [[50, 200], [50, 200], [-50, -165], [50, -165]],
  6: [[50, 200], [50, 200], [-295, 0], [-50, -165], [50, -165], [275, 10]],
  8: [[50, 200], [50, 200], [-295, 0], [-295, 0], [-50, -165], [50, -165], [275, 10], [275, 10]],
  10: [[-20, -10], [-15, 0], [-20, -10], [-15, 0], [-15, 0], [-15, 0], [-15, 0], [-15, 0], [-15, 0], [-15, 0], [-15, 0], [-15, 0]],
};
