

import React from "react";
import styled from "styled-components";

const HeaderContainer = styled.header`
  background-color: #333;
  color: #fff;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

const Navigation = styled.nav`
  ul {
    list-style-type: none;
    display: flex;
    margin: 0;
    padding: 0;
  }

  li {
    margin-left: 15px;
  }

  a {
    color: #fff;
    text-decoration: none;
    font-weight: 500;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Header = () => {
  return (
    <HeaderContainer>
      <Logo>Y</Logo>
      <Navigation>
        <ul>
          <li>
            <a href="/">Admin Home</a>
          </li>
          <li>
            <a href="/records">Records</a>
          </li>
          <li>
            <a href="/update">Updates</a>
          </li>
          <li>
            <a href="/contact">Contact</a>
          </li>
          <li>
            <a href="/Auth">Auth</a>
          </li>
        </ul>
      </Navigation>
    </HeaderContainer>
  );
};

export default Header;
