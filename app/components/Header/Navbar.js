import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
  transitionSpeed,
  transitionFn,
  navbarHeight,
  black,
} from '../../variables';

const StyledNavbarMenuList = styled.ul`
  -webkit-margin-before: 1em;
  -webkit-margin-after: 1em;
  -webkit-margin-start: 0px;
  -webkit-margin-end: 0px;
  -webkit-padding-start: 40px;
  box-sizing: border-box;
  display: block;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const StyledNavbarMenu = styled.div`
  box-sizing: border-box;
  display: block;
  float: right;
`;

const StyledNavbar = styled.nav`
  /* clearfix */
  &:before, &:after {
    display: table;
    content: " ";
    box-sizing: border-box;
  }
  &:after {
    clear: both;
  }
  /* transitions */
  -o-transition: margin-left ${transitionSpeed} ${transitionFn};
  transition: margin-left ${transitionSpeed} ${transitionFn};
  color: ${(props) => props.theme.navbarFontColor || '#333'};
  display: block;
  font-weight: 400;
  position: fixed;
  width: 100%;
  min-height: ${navbarHeight};
  z-index: 1000;
  margin-bottom: 0;
  border-radius: 0;
  background-color: ${(props) => props.transparent ? 'transparent' : black};
`;

const Navbar = (props) => (
  <StyledNavbar
    topNav={props.topNav}
    transparent={props.transparent}
  >
    <StyledNavbarMenu loggedIn={props.loggedIn} collapsed={props.collapsed}>
      <StyledNavbarMenuList name="navbar-menu-wrapper">
        {props.children}
      </StyledNavbarMenuList>
    </StyledNavbarMenu>
  </StyledNavbar>
  );


Navbar.propTypes = {
  children: PropTypes.node,
  topNav: PropTypes.bool,
  collapsed: PropTypes.bool,
  transparent: PropTypes.bool,
  loggedIn: PropTypes.bool,
};

export default Navbar;
