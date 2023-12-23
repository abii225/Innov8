
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  background-color: #333;
  color: white;
  padding: 15px;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 999;
`;

const Ul = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  padding: 0;
  justify-content:space-around;  
`;

const Li = styled.li`
  margin: 0 10px;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: white;
  font-weight: bold;

  &:hover {
    color: lightgray;
  }
`;

export const Navbar = () => {
  return (
    <Nav>
      <Ul>
        <Li>
          <NavLink to="/">Home</NavLink>
        </Li>
        <Li>
          <NavLink to="/info">Info</NavLink>
        </Li>
        <Li>
          <NavLink to="/interview">Interview</NavLink>
        </Li>
      </Ul>
    </Nav>
  );
};





