/**
 * Created by helge on 26.01.17.
 */

import EWT from 'ethereum-web-token';
import SagaTester from 'redux-saga-tester';
import { fromJS } from 'immutable';
import nock from 'nock';

import { PLAYER1, PLAYER2, PLAYER3, PLAYER4, PLAYER_EMPTY } from './consts';
import { updateScanner, payFlow } from '../sagas';
import { formActionSaga } from '../../../services/reduxFormSaga';
import {
  bet,
  pay,
  updateReceived,
  UPDATE_RECEIVED,
  RECEIPT_SET,
  BET,
  SHOW,
  NET,
} from '../actions';

import { ABI_BET, ABI_SHOW, ABI_SIT_OUT } from '../../../app.config';

const tableAddr = '0x112233';

describe('Saga Tests', () => {
  it('should disptach sb action when i am sb', () => {
    const hand = {
      state: 'waiting',
      dealer: 0,
      sb: 50,
      handId: 1,
      lineup: [{
        address: PLAYER1.address,
      }, {
        address: PLAYER2.address,
      }, {
        address: PLAYER3.address,
      }, {
        address: PLAYER4.address,
      }],
    };

    const initialState = fromJS({
      account: {
        privKey: PLAYER2.key,
      },
      table: {
        [tableAddr]: { data: { smallBlind: 500 } },
      },
    });

    const sagaTester = new SagaTester({ initialState });
    sagaTester.start(updateScanner);
    sagaTester.dispatch(updateReceived(tableAddr, hand));
    expect(sagaTester.getLatestCalledAction().type).toEqual(BET);
    expect(sagaTester.getLatestCalledAction().amount).toEqual(500);
    expect(sagaTester.getCalledActions().length).toEqual(2);
    // do the same thing again, and make sure the request
    // is deduplicated
    sagaTester.dispatch(updateReceived(tableAddr, hand));
    expect(sagaTester.getLatestCalledAction().type).toEqual(UPDATE_RECEIVED);
    expect(sagaTester.getCalledActions().length).toEqual(3);
  });

  it('should disptach sb action when when player comes back from sitout', () => {
    const hand = {
      state: 'waiting',
      dealer: 0,
      handId: 1,
      lineup: [{
        address: PLAYER1.address,
      }, {
        address: PLAYER2.address,
        last: new EWT(ABI_SIT_OUT).sitOut(1, 0).sign(PLAYER2.key),
      }],
    };

    const initialState = fromJS({
      account: {
        privKey: PLAYER1.key,
      },
      table: {
        [tableAddr]: { data: { smallBlind: 500 } },
      },
    });

    const sagaTester = new SagaTester({ initialState });
    sagaTester.start(updateScanner);
    sagaTester.dispatch(updateReceived(tableAddr, hand));
    expect(sagaTester.getLatestCalledAction().type).toEqual(BET);
    expect(sagaTester.getLatestCalledAction().amount).toEqual(500);
    expect(sagaTester.getCalledActions().length).toEqual(2);
    // do the same thing again, and make sure the request
    // is deduplicated
    sagaTester.dispatch(updateReceived(tableAddr, hand));
    expect(sagaTester.getLatestCalledAction().type).toEqual(UPDATE_RECEIVED);
    expect(sagaTester.getCalledActions().length).toEqual(3);
  });

  it('should dispatch bet action with bb amount', () => {
    const hand = {
      state: 'dealing',
      dealer: 0,
      handId: 1,
      sb: 50,
      lineup: [{
        address: PLAYER1.address,
      }, {
        address: PLAYER2.address,
        last: new EWT(ABI_BET).bet(1, 500).sign(PLAYER2.key),
      }, {
        address: PLAYER3.address,
      }, {
        address: PLAYER4.address,
      }],
    };

    const initialState = fromJS({
      account: {
        privKey: PLAYER3.key,
      },
      table: {
        [tableAddr]: { data: { smallBlind: 500 } },
      },
    });

    const sagaTester = new SagaTester({ initialState });
    sagaTester.start(updateScanner);
    sagaTester.dispatch(updateReceived(tableAddr, hand));
    expect(sagaTester.getLatestCalledAction().type).toEqual(BET);
    expect(sagaTester.getCalledActions().length).toEqual(2);
    expect(sagaTester.getLatestCalledAction().amount).toEqual(1000);
    // do the same thing again, and make sure the request
    // is deduplicated
    sagaTester.dispatch(updateReceived(tableAddr, hand));
    expect(sagaTester.getLatestCalledAction().type).toEqual(UPDATE_RECEIVED);
    expect(sagaTester.getCalledActions().length).toEqual(3);
  });

  it('should dispatch show action when its showtime!', () => {
    const hand = {
      handId: 3,
      state: 'showdown',
      dealer: 0,
      sb: 50,
      lineup: [{
        address: PLAYER1.address,
        last: new EWT(ABI_SHOW).show(1, 1000).sign(PLAYER1.key),
      }, {
        address: PLAYER_EMPTY.address,
      }, {
        address: PLAYER2.address,
        last: new EWT(ABI_BET).bet(1, 1000).sign(PLAYER2.key),
      }],
    };

    const initialState = fromJS({
      account: {
        privKey: PLAYER2.key,
      },
      table: {
        [tableAddr]: {
          3: {
            holeCards: [12, 13],
          },
        },
      },
    });

    const sagaTester = new SagaTester({ initialState });
    sagaTester.start(updateScanner);
    sagaTester.dispatch(updateReceived(tableAddr, hand));
    const show = sagaTester.getLatestCalledAction();
    expect(show.type).toEqual(SHOW);
    expect(show.amount).toEqual(1000);
    expect(show.holeCards).toEqual([12, 13]);
    // do the same thing again, and make sure the request
    // is deduplicated
    sagaTester.dispatch(updateReceived(tableAddr, hand));
    expect(sagaTester.getLatestCalledAction().type).toEqual(UPDATE_RECEIVED);
    expect(sagaTester.getCalledActions().length).toEqual(3);
  });

  it('should dispatch show action when its showtime as all-in player!', async () => {
    const hand = {
      handId: 4,
      state: 'showdown',
      dealer: 0,
      sb: 50,
      lineup: [{
        address: PLAYER1.address,
        last: new EWT(ABI_SHOW).show(1, 1000).sign(PLAYER1.key),
      }, {
        address: PLAYER_EMPTY.address,
      }, {
        address: PLAYER2.address,
        last: new EWT(ABI_BET).bet(1, 1000).sign(PLAYER2.key),
        sitout: 'allin',
      }],
    };
    const initialState = fromJS({
      account: {
        privKey: PLAYER2.key,
      },
      table: {
        [tableAddr]: {
          4: {
            holeCards: [12, 13],
          },
        },
      },
    });

    const sagaTester = new SagaTester({ initialState });
    sagaTester.start(updateScanner);
    await sagaTester.dispatch(updateReceived(tableAddr, hand));
    const show = sagaTester.getLatestCalledAction();
    expect(show.type).toEqual(SHOW);
    expect(show.amount).toEqual(1000);
    expect(show.holeCards).toEqual([12, 13]);
    expect(sagaTester.getCalledActions().length).toEqual(2);
  });


  it('should dispatch net action when there is a netting request', () => {
    const hand = {
      handId: 3,
      state: 'flop',
      dealer: 0,
      netting: {
        newBalances: '0x1234',
        [PLAYER1.address]: '0x',
      },
      lineup: [{
        address: PLAYER1.address,
        last: new EWT(ABI_BET).bet(1, 1000).sign(PLAYER1.key),
      }, {
        address: PLAYER_EMPTY.address,
      }, {
        address: PLAYER2.address,
        last: new EWT(ABI_BET).bet(1, 1000).sign(PLAYER2.key),
      }],
    };

    const initialState = fromJS({
      account: {
        privKey: PLAYER2.key,
      },
    });

    const sagaTester = new SagaTester({ initialState });
    sagaTester.start(updateScanner);
    sagaTester.dispatch(updateReceived(tableAddr, hand));
    expect(sagaTester.getLatestCalledAction().type).toEqual(NET);
    expect(sagaTester.getLatestCalledAction().balances).toEqual('0x1234');
    expect(sagaTester.getLatestCalledAction().handId).toEqual(3);
    // do the same thing again, and make sure the request
    // is deduplicated
    sagaTester.dispatch(updateReceived(tableAddr, hand));
    expect(sagaTester.getLatestCalledAction().type).toEqual(UPDATE_RECEIVED);
    expect(sagaTester.getCalledActions().length).toEqual(3);
  });

  it('should not dispatch netting when already signed', () => {
    const hand = {
      handId: 3,
      state: 'flop',
      dealer: 0,
      netting: {
        newBalances: '0x1234',
        [PLAYER2.address]: '0x',
      },
    };

    const initialState = fromJS({
      account: {
        privKey: PLAYER2.key,
      },
    });

    const sagaTester = new SagaTester({ initialState });
    sagaTester.start(updateScanner);
    sagaTester.dispatch(updateReceived(tableAddr, hand));
    expect(sagaTester.getCalledActions().length).toEqual(1);
  });

  it('should return cards when bet successful', async () => {
    // mock a successful request
    nock('http://ab.com', { filteringScope: () => true })
      .filteringPath(() => '/')
      .post('/')
      .reply(200, '{"cards":[12,13]}');

    const initialState = fromJS({
      table: {
        [tableAddr]: {
          data: {},
          3: {
            dealer: 0,
            state: 'flop',
            lineup: [{}, {}],
          },
        },
      },
    });
    const sagaTester = new SagaTester({ initialState });
    sagaTester.start(formActionSaga);
    sagaTester.start(payFlow);
    const payAction = bet(tableAddr, 3, 500, PLAYER2.key, 1, 'prevReceipt');
    const rsp = await pay(payAction, (action) => sagaTester.dispatch(action));
    expect(rsp).toEqual([12, 13]);
    const receipt = sagaTester.getCalledActions()[1];
    expect(receipt.type).toEqual(RECEIPT_SET);
    expect(receipt.handId).toEqual(3);
    expect(receipt.pos).toEqual(1);
    expect(receipt.tableAddr).toEqual(tableAddr);
    expect(sagaTester.getCalledActions().length).toEqual(3);
  });

  it('should reset receipt when call fails', async (done) => {
    // mock a failed request
    nock('http://ab.com', { filteringScope: () => true })
      .filteringPath(() => '/')
      .post('/')
      .reply(401, '{"errorMessage":"unauthorized"}');

    const initialState = fromJS({
      table: {
        [tableAddr]: {
          data: {},
          3: {
            dealer: 0,
            state: 'flop',
            lineup: [{}, {}],
          },
        },
      },
    });
    const sagaTester = new SagaTester({ initialState });
    sagaTester.start(formActionSaga);
    sagaTester.start(payFlow);
    const payAction = bet(tableAddr, 3, 500, PLAYER2.key, 1, 'prevReceipt');
    pay(payAction, (action) => sagaTester.dispatch(action)).catch((err) => {
      expect(err).toEqual('unauthorized');
      const receiptAction = sagaTester.getCalledActions()[2];
      expect(receiptAction.type).toEqual(RECEIPT_SET);
      expect(receiptAction.receipt).toEqual('prevReceipt');
      expect(receiptAction.handId).toEqual(3);
      expect(receiptAction.pos).toEqual(1);
      expect(receiptAction.tableAddr).toEqual(tableAddr);
      done();
    });
  });
});
