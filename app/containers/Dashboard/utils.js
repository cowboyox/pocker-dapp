import React from 'react';
import { FormattedDate, FormattedTime } from 'react-intl';
import { conf } from '../../app.config';
const confParams = conf();

export function isSellEvent(event) {
  return (
    event.address === confParams.ntzAddr &&
    event.unit === 'ntz' &&
    event.type === 'outcome'
  );
}

export function isETHPayoutEvent(event) {
  return (
    event.address === confParams.pullAddr &&
    event.unit === 'eth' &&
    event.type === 'income'
  );
}

export function isABPPayoutEvent(event) {
  return (
    event.address === confParams.pwrAddr
    && event.type === 'income'
  );
}

export function isPurchaseEndEvent(event, address) {
  return event.address === address && event.unit === 'ntz';
}

export function isPurchaseStartEvent(event) {
  return event.address === confParams.ntzAddr && event.unit === 'eth';
}

export function isPowerUpEvent(event) {
  return event.address === confParams.pwrAddr && event.unit === 'abp' && event.type === 'income';
}

export function formatDate(timestamp) {
  if (!timestamp) {
    return '';
  }

  const date = new Date(timestamp * 1000);

  return (
    <span>
      <FormattedDate
        value={date}
        year="numeric"
        month="numeric"
        day="2-digit"
      />,&nbsp;
      <FormattedTime
        value={date}
        hour12={false}
      />
    </span>
  );
}
