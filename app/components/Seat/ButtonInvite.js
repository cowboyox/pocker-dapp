/**
* Created by jzobro 20170519
*/
import React from 'react';
import {
  ButtonIcon,
  ButtonStyle,
  ButtonText,
  ButtonWrapper,
  SeatWrapper,
} from './styles';

const ButtonInvite = ({ coords, onClickHandler }) => (
  <SeatWrapper coords={coords}>
    <ButtonWrapper onClick={onClickHandler}>
      <ButtonStyle>
        <ButtonIcon className="fa fa-envelope" aria-hidden="true" />
        <ButtonText>Invite</ButtonText>
      </ButtonStyle>
    </ButtonWrapper>
  </SeatWrapper>
);
ButtonInvite.propTypes = {
  onClickHandler: React.PropTypes.func,
  coords: React.PropTypes.array,
};

export default ButtonInvite;
