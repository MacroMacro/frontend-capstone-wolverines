import React, { useState } from 'react';
import styled from 'styled-components';

function Nav ({searchProduct}) {
  const [search, setSearch] = useState();

  function changeSearch (e) {
    setSearch(e.target.value);
  };

  function clickHandler () {
    searchProduct(search.toLowerCase());
  }

  return (
    <NavContainer>
      <NavHeader>Wolverine</NavHeader>
      <NavCart>
        <span className ="material-symbols-outlined">shopping_cart_checkout</span>
      </NavCart>
      <NavSearch>
        <input value = {search} onChange = {changeSearch}></input>
        <button onClick = {clickHandler} className = 'search-button'>🔍</button>
      </NavSearch>


    </NavContainer>
  )
}

export default Nav;
const NavContainer = styled.div`
  margin: 10px 80px 0px 80px;
  width: 100%;
  display: inline-block;
  background: indigo;
  color: white;
  font-family: 'Courier New', Courier, monospace;
`;

const NavHeader = styled.h2`
  margin-left: 80px;
  float: left;
`;

const NavSearch = styled.div`
  margin-top: 20px;
  float: right;
`;

const NavCart = styled.div`
  margin-top: 20px;
  float: right;
  margin-right: 160px;
  margin-left: 60px;
`;