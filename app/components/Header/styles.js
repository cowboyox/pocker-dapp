import styled from 'styled-components';

import {
  fontFamilyBase,
  fontSizeBase,
  lineHeightBase,
  fontWeightBase,
  navbarHeight,
  navbarPaddingHorizontal,
  navbarPaddingVertical,
  screenXsMax,
  navbarColorCurrent,
  baseColor,
} from '../../variables';

const imageSize = `${Math.floor(parseInt(navbarHeight, 10) / 2)}px`;
const imageMarginTop = `-${Math.ceil(
  ((parseInt(imageSize, 10) +
  parseInt(navbarPaddingHorizontal, 10) +
  parseInt(navbarPaddingVertical, 10)) -
  parseInt(navbarHeight, 10)) / 2)}px`;
const imageMarginBottom = `-${Math.floor(
  ((parseInt(imageSize, 10) +
  parseInt(navbarPaddingHorizontal, 10) +
  parseInt(navbarPaddingVertical, 10)) -
  parseInt(navbarHeight, 10)) / 2)}px`;

export const StyledUserImage = styled.img`
  box-sizing: border-box;
  float: left;
  border: 0;
  vertical-align: middle;
  width: ${imageSize};
  height: ${imageSize};
  border-radius: 50%;
  margin-right: 10px;
  margin-top: ${imageMarginTop};
  margin-bottom: ${imageMarginBottom};
  max-width: none;
  background-color: gray;

  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Chrome/Safari/Opera */
  -khtml-user-select: none; /* Konqueror */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently not supported by any browser */
`;

export const StyledUserName = styled.span`
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Chrome/Safari/Opera */
  -khtml-user-select: none; /* Konqueror */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently not supported by any browser */
`;

// Header
export const StyledHeader = styled.header`
  &:before, &:after {
    display: table;
    content: " ";
    box-sizing: border-box;
  }
  &:after {
    clear: both;
  }
  position: ${(props) => (props.fixed ? 'fixed' : 'relative')};
  width: 100%;
  max-height: 50px;
  z-index: 1030;
  /* theme */
  ${(props) => props.theme.headerBoxShadow && `
    box-shadow: ${props.theme.headerBoxShadow};
  `}
`;

export const NavToggle = styled.button`
  position: relative;
  float: right;
  padding: 9px 10px;
  margin-top: 8px;
  margin-right: 15px;
  margin-bottom: 8px;
  background-color: transparent;
  background-image: none;
  border: 1px solid transparent;
  border-radius: 4px;
  cursor: pointer;
  &:focus {
    outline: none;
  }
  @media (min-width: ${screenXsMax}) {
    display: none;
  }
`;

// NavItem
export const StyledSpan = styled.span`
  width: 100%;
`;

export const StyledIcon = styled.i`
  color: inherit;
  box-sizing: border-box;
  float: left;
  border: 0;
  vertical-align: top;
  border-radius: 50%;
  margin-right: 10px;
  max-width: none;
  font-size: 28px;
  margin-top: -4px;

  &:hover {
    color: inherit;
  }

  cursor: pointer;
  user-select: none; /* Non-prefixed version, currently not supported by any browser */
`;

export const StyledImage = styled.img`
  color: inherit;
  box-sizing: border-box;
  float: left;
  border: 0;
  vertical-align: middle;
  width: ${imageSize};
  height: ${imageSize};
  border-radius: 50%;
  margin-right: 10px;
  margin-top: ${imageMarginTop};
  margin-bottom: ${imageMarginBottom};
  max-width: none;

  &:hover {
    color: inherit;
  }

  cursor: pointer;
  user-select: none; /* Non-prefixed version, currently not supported by any browser */
`;

export const StyledLink = styled.a`
  text-decoration: none;
  user-select: none; /* Non-prefixed version, currently not supported by any browser */

  color: inherit;
  display: block;
  cursor: pointer;
  padding: ${navbarPaddingVertical} ${navbarPaddingHorizontal};
  position: relative;
  background-color: transparent;

  border-bottom: 2px solid transparent;

  &:hover {
    color: ${(props) => props.theme.navbarHoverColor || '#fff'};
    text-decoration: none !important;
    border-bottom-color: ${baseColor};
  }
`;

export const ActiveLink = styled(StyledLink)`
  cursor: default;
  border-bottom: 2px solid ${navbarColorCurrent};
  background-color: ${navbarColorCurrent};

  &:hover {
    border-bottom-color: ${navbarColorCurrent};
  }
`;

export const StyledItem = styled.li`
  /* shared */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family: ${fontFamilyBase};
  font-weight: ${fontWeightBase};
  font-size: ${fontSizeBase};
  line-height: ${lineHeightBase};
  box-sizing: border-box;

  float: left;
  display: block;
  background-image: none;
  position: relative;
  text-decoration: none;
  &:focus, &:active {
    background: transparent;
    outline: none;
  }

  /* theme */
  color: ${(props) => props.theme.navbarFontColor || '#fff'};
  border-left: ${(props) => props.theme.navbarItemBorder || 'none'};

  @media (max-width: ${screenXsMax}) {
    width: ${(props) => props.collapseOnMobile ? '100%' : 'auto'};
    display: ${(props) => props.collapsed ? 'none' : 'block'};
  }
`;

export const LogoWrapper = styled.div`
  position: absolute;
  left: 15px;
  top: 13px;

  text-decoration: none;
`;
