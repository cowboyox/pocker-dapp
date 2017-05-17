
import styled from 'styled-components';

// colors
const successBg = 'linear-gradient(0deg, #B4ED50 0%, #78D049 100%)';
const infoBg = 'linear-gradient(0deg, #D4D4D4 0%, #4D4D4D 100%)';
const warningBg = 'linear-gradient(0deg, #F7F8CB 0%, #F7F51C 100%)';
const dangerBg = 'linear-gradient(0deg, #FBDA61 0%, #F76B1C 100%)';
const successColor = '#305209'; // greenish
const infoColor = '#FFFFFF'; // white
const warningColor = '#5E5F3B'; // yellowish
const dangerColor = '#63430F';  // orangish
// shadows
const smallShadow = '0 1px 4px 0 rgba(0,0,0,0.50)';
const medShadow = '0 2px 4px 0 rgba(0,0,0,0.50)';

// components
export const SeatWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 128px;

  color: white;
  background-color: none;
`;

// cards
export const CardWrapper = styled.div`
  display: flex;
  margin-left: 48px;

  background-color: none;
`;

export const Card = styled.div`
  background-color: green;
  width: 2em;
`;

// info
export const InfoWrapper = styled.div`
  display: flex;

  background-color: #333;
  background-image: linear-gradient(-180deg, #787878 0%, #393939 50%, #1F1F1F 50%, #3C3C3C 100%);
  border-radius: 4px;
  box-shadow: ${medShadow};
  color: #D5D5D5;
  font-weight: 400;
  z-index: 100;
`;

export const AvatarImage = styled.img`
  background-color: AliceBlue;
  border-radius: 3px;
  margin: 3px 4px;
`;

export const DetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  background-color: none;
  margin-left: 2px;
`;

export const Username = styled.div`
  font-size: 0.9em;
  background-color: none;
  color: white;
`;

export const ChipCount = styled.div`
  font-size: 0.9em;
  background-color: none;
  color: white;
`;

// status
export const StatusWrapper = styled.div`
  display: flex;

  background-color: none;
`;

export const Status = styled.div`
  margin-left: 10px;
  padding: 0 10px;
  font-weight: 600;

  color: ${(props) => {
    if (props.type === 'success') return successColor;
    if (props.type === 'info') return infoColor;
    if (props.type === 'warning') return warningColor;
    if (props.type === 'danger') return dangerColor;
    return infoColor;
  }};
  background: ${(props) => {
    if (props.type === 'success') return successBg;
    if (props.type === 'info') return infoBg;
    if (props.type === 'warning') return warningBg;
    if (props.type === 'danger') return dangerBg;
    return infoBg;
  }};
  box-shadow: ${smallShadow};
  border-radius: 0 0 2px 2px;
`;
