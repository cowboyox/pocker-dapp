/**
 * Created by helge on 29.03.17.
 */

import { createSelector } from 'reselect';
import { PokerHelper, ReceiptCache } from 'poker-helper';

import {
  makeMaxBetSelector,
  makeMyMaxBetSelector,
  makeSbSelector,
  makeHandSelector,
  makeHandStateSelector,
  makeIsMyTurnSelector,
} from '../Table/selectors';

import {
  makeMyStackSelector,
} from '../Seat/selectors';

const getIsMyTurn = (_, props) => props.isMyTurn;
const getActionBarState = (state) => state.get('actionBar');
const rc = new ReceiptCache();
const pokerHelper = new PokerHelper(rc);

/*
 * ActionBar related selectors
 */
export const makeSelectActionBarActive = () => createSelector(
  [makeHandStateSelector(), getIsMyTurn, getActionBarTurnComplete()],
  (handState, isMyTurn, turnComplete) => {
    if (turnComplete) return false;
    const isAppropriateState = (
      handState !== 'waiting' && handState !== 'dealing' && handState !== 'showdown'
    );
    if (isMyTurn && isAppropriateState) {
      return true;
    }
    return false;
  }
);

// show the ActionBar if the player is sitting at the table
export const makeSelectActionBarVisible = () => createSelector(
  (_, props) => props.myPos,
  (myPos) => {
    if (myPos === undefined) return false;
    if (typeof myPos === 'number') return true;
    return false;
  }
);

export const getActionBarMode = () => createSelector(
  getActionBarState,
  (actionBar) => actionBar.get('mode'),
);

export const getActionBarSliderOpen = () => createSelector(
  getActionBarState,
  (actionBar) => actionBar.get('sliderOpen'),
);

export const getActionBarTurnComplete = () => createSelector(
  getActionBarState,
  (actionBar) => actionBar.get('turnComplete'),
);

export const getActionBarButtonActive = () => createSelector(
  getActionBarState,
  (actionBar) => actionBar.get('buttonActive'),
);

export const getExecuteAction = () => createSelector(
  getActionBarState,
  (actionBar) => actionBar.get('executeAction'),
);

// Other selectors
const makeAmountToCallSelector = () => createSelector(
  [makeMaxBetSelector(), makeMyMaxBetSelector()],
  (maxBet, myMaxbet) => {
    if (maxBet === undefined || myMaxbet === undefined) {
      return undefined;
    }
    return maxBet - myMaxbet;
  }
);

const makeMinSelector = () => createSelector(
  [makeSbSelector(), makeHandSelector(), makeMyStackSelector(), makeAmountToCallSelector(), makeMaxBetSelector()],
  (sb, hand, stack, amountToCall, maxBet) => {
    if (!sb || !hand || hand.get('state') === 'waiting') {
      return undefined;
    }
    // if my stack smaller than BB return the left behind stack
    if (stack < sb * 2) {
      return stack;
    }
    const lineup = hand.get('lineup').toJS();
    const dealer = hand.get('dealer');
    // check if there was a raise exclude preflop sb and bb
    const lastRoundMaxBet = hand.get('lastRoundMaxBet');
    let minRaise;
    try {
      minRaise = pokerHelper.findMinRaiseAmount(lineup, dealer, lastRoundMaxBet);
    } catch (e) {
      // there was no raise
      if (e.message === 'can not find minRaiseAmount.') {
        return (sb * 2) + amountToCall;
      }
      throw (e);
    }

    if (minRaise > 0 && maxBet !== sb * 2) {
      return minRaise + amountToCall;
    }
    return (sb * 2) + amountToCall;
  }
);

const makeCallAmountSelector = () => createSelector(
  [makeAmountToCallSelector(), makeMyStackSelector()],
  (amountToCall, stack) => (amountToCall > stack) ? stack : amountToCall
);

const makeCanICheckSelector = () => createSelector(
  [makeIsMyTurnSelector(), makeHandStateSelector(), makeAmountToCallSelector(), makeMyStackSelector()],
  (isMyTurn, state, amountToCall, myStack) =>
  isMyTurn &&
  state !== 'waiting' && state !== 'dealing' && state !== 'showdown' &&
  amountToCall <= myStack && amountToCall === 0
);

export {
  makeAmountToCallSelector,
  makeMinSelector,
  makeCallAmountSelector,
  makeCanICheckSelector,
};
