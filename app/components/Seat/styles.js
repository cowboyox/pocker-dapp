import styled, { keyframes } from 'styled-components';

import {
  infoBgInverse,
  activeColor,
  infoColor,
  medShadow,
  smallShadow,
} from '../../variables';

import {
  alertBg,
  alertColor,
  Button,
  scaleSeat,
  scaleButtonJoin,
} from '../../utils/styleUtils';

const fontWeightInfo = 500;
const fontWeigthBold = 600;

// shared styles
export const SharedMiddle = styled.div`
  background-color: #333;
  background-image: linear-gradient(-180deg, #787878 0%, #393939 50%, #1F1F1F 50%, #3C3C3C 100%);
  box-shadow: ${medShadow};
`;

export const SharedLower = styled.div`
  margin-left: ${scaleSeat(8)};
  box-shadow: ${smallShadow};
  border-radius: 0 0 ${scaleSeat(3)} ${scaleSeat(3)};
`;

// seat
export const SeatWrapper = styled.div`
  position: absolute;
  left: ${(props) => props.coords[0]}%;
  top: ${(props) => props.coords[1]}%;
  color: 'white';
  width: 10%;
  height: 25%;
`;

export const SeatContainer = styled.div`
  position: absolute;
  top: ${scaleSeat(-20)};
  left: ${scaleSeat(-64)};
  display: flex;
  flex-direction: column;
  width: ${scaleSeat(128)};
  height: auto;

  color: white;
  background-color: none;
  opacity: ${(props) => props.activePlayer ? 1 : 0.5};
`;

// chips & dealer button
export const ChipButtonContainer = styled.div`
  position: relative;
  height: 0;
`;

export const DealerButton = styled.div`
  display: ${(props) => !(props.dealer === props.pos) ? 'none' : 'inherit'};
  position: absolute;
  top: ${scaleSeat(-28)};
  left: ${scaleSeat(12)};
  width: ${scaleSeat(20)};
  height: ${scaleSeat(20)};

  background: white;
  border-radius: 50%;
  box-shadow: ${smallShadow};

  text-align: center;
  font-weight: 600;
  font-size: ${scaleSeat(14)};
  color: #353535;
`;

// info
export const InfoWrapper = styled(SharedMiddle)`
  display: flex;
  border-radius: ${scaleSeat(4)};

  color: #D5D5D5;
  font-weight: 400;
  z-index: 100;
`;

export const AvatarImage = styled.div`
  background-color: AliceBlue;
  background-image: url(${(props) => props.bgImg});
  background-size: ${scaleSeat(38)} ${scaleSeat(38)};
  width: ${scaleSeat(38)};
  height: ${scaleSeat(38)};
  border-radius: ${scaleSeat(3)};
  margin: ${scaleSeat(3)} ${scaleSeat(4)};
`;

export const DetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  background-color: none;
  margin-left: ${scaleSeat(2)};
`;

export const NameBox = styled.div`
  padding-bottom: ${scaleSeat(2)};
  font-size: ${scaleSeat(11)};
  background-color: none;
  color: white;
`;

export const StackBox = styled.div`
  padding-top: ${scaleSeat(2)};
  font-size: ${scaleSeat(11)};
  background-color: none;
  color: white;
`;

// status
export const StatusWrapper = styled.div`
  display: flex;

  background-color: none;
`;

const hideStatus = keyframes`
  from { transform: translate(0, 0); }
  to { transform: translate(0, -16px); }
`;

export const StatusActionStyle = styled(SharedLower)`
  padding-top: 0;
  padding-left: ${scaleSeat(10)};
  padding-bottom: ${scaleSeat(1)};
  padding-right: ${scaleSeat(10)};
  font-weight: ${
    (props) => (props.type === 'info') ? fontWeightInfo : fontWeigthBold
  };
  font-size: ${scaleSeat(11)};
  color: ${(props) => alertColor(props.type)};
  background: ${(props) => alertBg(props.type, 'solid')};
  opacity: ${(props) => props.recent ? 1 : 0.4};
  animation: ${hideStatus} 0.3s;
  animation-delay: 4s;
  animation-fill-mode: backwards;
  transform: translate(0, -16px);
  transition: transform 0.3s;

  ${SeatWrapper}:hover & {
    transform: translate(0, 0);
  }
`;

export const StatusSeatWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: ${scaleSeat(6)};
  margin-top: ${scaleSeat(22)};

  background-color: none;
`;

export const StatusSeat = styled.div`
  padding-top: 0;
  padding-left: ${scaleSeat(14)};
  padding-bottom: ${scaleSeat(1)};
  padding-right: ${scaleSeat(14)};
  height: ${scaleSeat(18)};

  font-weight: ${fontWeightInfo};
  font-size: ${scaleSeat(11)};
  color: ${infoColor};

  background: ${infoBgInverse};
  box-shadow: ${smallShadow};
  border-radius: ${scaleSeat(3)} ${scaleSeat(3)} 0 0;
`;

// timer
export const TimerWrapper = styled(SharedLower)`
  width: ${scaleSeat(110)};
  background-color: #393939;
`;

export const TimerBackground = styled.div`
  position: relative;
  height: ${scaleSeat(6)};
  margin-top: 0;
  margin-right: ${scaleSeat(3)};
  margin-bottom: ${scaleSeat(3)};
  margin-left: ${scaleSeat(3)};
  background-color: #727272;
  border-radius: 0 0 ${scaleSeat(2)} ${scaleSeat(2)};
`;

export const TimerBar = styled.div`
  position: absolute;
  height: 100%;
  top: 0px;
  left: 0px;
  width: ${(props) => props.width};
  border-radius: 0 0 ${scaleSeat(2)} ${scaleSeat(2)};
  background: ${(props) => alertBg(props.type, 'gradient')};
`;

// ButtonJoin
export const ButtonStyle = styled(SharedMiddle)`
  border-radius: ${scaleButtonJoin(4)};
  width: ${scaleButtonJoin(44)};
`;

export const ButtonWrapper = styled(Button)`
  position: absolute;
  margin-top: ${scaleButtonJoin(42)};
  margin-left: ${scaleButtonJoin(42)};
  height: ${scaleButtonJoin(40)};
  width: ${scaleButtonJoin(42)}
  top: ${scaleButtonJoin(-20)};
  left: ${scaleButtonJoin(-64)};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  color: #D5D5D5;
  font-weight: 400;
  &:hover {
    color: white;
    transform: scale(1.1, 1.1);
    ${''/* box-shadow: inset 0 1px 3px 0 rgba(0,0,0,0.50); */}
  }
  &:active {
    color: ${activeColor};
    transform: scale(1.0, 1.0);
  }
`;

export const ButtonIcon = styled.i`
  flex: auto;
  padding-top: ${scaleButtonJoin(2)};
  padding-right: ${scaleButtonJoin(6)};
  padding-bottom: ${scaleButtonJoin(5)};
  padding-left: ${scaleButtonJoin(6)};
  &:before {
    font-size: ${scaleButtonJoin(12)};
  }
`;

export const ButtonText = styled.div`
  font-size: ${scaleButtonJoin(10)};
  font-weight: 600;
  flex: auto;
  padding-top: ${scaleButtonJoin(1)};
  padding-bottom: ${scaleButtonJoin(3)};
`;
