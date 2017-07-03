/**
* Created by jzobro 20170517
*/
import React from 'react';
import PropTypes from 'prop-types';

import Seat from './Seat';
import ButtonJoinSeat from './ButtonJoinSeat';
import ButtonOpenSeat from './ButtonOpenSeat';

const SeatComponent = (props) => {
  const {
    isTaken,
    myPos,
    open,
    pos,
    pending,
  } = props;
  if (open) {
    if (myPos === undefined || pending) {
      if (pending) {
        return (
          <Seat {...props} {...pending} />
        );
      }

      return (
        <ButtonJoinSeat
          onClickHandler={() => isTaken(open, myPos, pending, pos)}
          {...props}
        />
      );
    }
    if (typeof myPos === 'number') {
      return <ButtonOpenSeat {...props} />;
    }
  }
  return <Seat {...props} />;
};
SeatComponent.propTypes = {
  isTaken: PropTypes.func,
  myPos: PropTypes.number,
  open: PropTypes.bool,
  pos: PropTypes.number,
  pending: PropTypes.any,
};

export default SeatComponent;
