/**
* Created by jzobro 20170517
*/
import React from 'react';

import {
  SeatWrapper,
  CardWrapper,
  Card,
  InfoWrapper,
  AvatarImage,
  DetailWrapper,
  Username,
  ChipCount,
  StatusWrapper,
  Status,
} from './styles';

const username = 'Username12';
const chipcount = '1,000';
const avatarSize = [38, 38]; // x,y
const statusText = 'All-in';
const statusType = 'warning'; // success(green), info(grey), warning(yellow), danger(orange)

const SeatComponent = () => (
  <SeatWrapper>
    <CardWrapper>
      <Card>DA</Card>
      <Card>S9</Card>
    </CardWrapper>
    <InfoWrapper>
      <AvatarImage src={`https://baconmockup.com/${avatarSize[0]}/${avatarSize[1]}`} />
      <DetailWrapper>
        <Username>{username}</Username>
        <ChipCount>{chipcount}</ChipCount>
      </DetailWrapper>
    </InfoWrapper>
    <StatusWrapper>
      <Status type={statusType}>{statusText}</Status>
    </StatusWrapper>
  </SeatWrapper>
);

export default SeatComponent;
