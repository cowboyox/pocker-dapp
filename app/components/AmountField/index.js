import React, { PropTypes } from 'react';
import { Field } from 'redux-form/immutable';
import BigNumber from 'bignumber.js';

const AmountField = ({
  maxAmount,
  minAmount = 0,
  ...props
}) => {
  const limitAmount = (value) => BigNumber.min(
    BigNumber.max(minAmount, value || 0),
    maxAmount,
  ).toNumber();

  return (
    <Field
      type="number"
      normalize={maxAmount && limitAmount}
      {...props}
    />
  );
};

AmountField.propTypes = {
  maxAmount: PropTypes.object,
  minAmount: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
};

export default AmountField;
