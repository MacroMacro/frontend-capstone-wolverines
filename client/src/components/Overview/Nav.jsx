import React, { useState } from 'react';
import styled from 'styled-components';

function Nav ({searchProduct, navBar, updateProduct}) {
  const [search, setSearch] = useState();
  const [dropdown, setDropdown] = useState(0);
  const [darkmode, setDarkmode] = useState(0);

  function changeSearch (e) {
    setSearch(e.target.value);
  };

  function clickHandler () {
    searchProduct(search.toLowerCase());
  }

  function Darkmode () {
    setDarkmode(1-darkmode);
  }

  document.getElementById('app').style.backgroundColor = darkmode === 1? 'black' : 'white';
  document.getElementById('app').style.color = darkmode === 1? 'white': 'black';

  return (
    <NavContainer>
      <Navi>
        <NavHeader>Wolverine</NavHeader>
        <Menu>{Object.keys(navBar).map((cat)=>
          <Cat id = 'menubar' >
            <DropButton>{cat}</DropButton>
            <Dropdown id = 'menulist'>
              {navBar[cat].map((product)=><List onClick = {() => updateProduct(product['id'])}>{product['name']}</List>)}
            </Dropdown>
          </Cat>)}
       </Menu>
       <DarkCheck>
        <input type = 'checkbox' id = 'darkmode' name = 'darkmode' value = 'yes' onClick = {Darkmode}/>
        <label for = 'darkmode'> Darkmode</label>
       </DarkCheck>
        <NavCart>
          <span className ="material-symbols-outlined">shopping_cart_checkout</span>
        </NavCart>
        <NavSearch>
          <SearchInput value = {search} onChange = {changeSearch}></SearchInput>
          <SearchButton onClick = {clickHandler} className = 'search-button'>🔍</SearchButton>
        </NavSearch>
      </Navi>

    </NavContainer>
  )
}

export default Nav;

const NavContainer = styled.div`
  margin: 0px 40px 40px 80px;
  padding-top: 40px;
  height: 70px;
  z-index: 1;
  border-bottom: 2px solid;
`;

const Navi = styled.div`
  width: 100%;
  display: inline-block;
  font-family: 'Courier New', Courier, monospace;
  border-radius: 1%;
  height: 70px;
`;

const NavHeader = styled.h2`
  margin-left: 30px;
  float: left;
`;

const Menu = styled.div`
  margin: 10px 0px 20px 10px;
  width: 600px;
  float: left;
`;

const Cat = styled.div`
  float: left;
  margin-left: 20px;
  font-size: 18px;
  overflow: hidden;
`;

const DropButton = styled.div`
  cursor: pointer;
  font-size: 17px;
  border: none;
  outline: none;
  padding: 15px 16px;
  font-family: 'Courier New', Courier, monospace;
  margin: 0;
`;

const Dropdown = styled.div`
  display: none;
  position: absolute;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  background-color: white;
`;

const List = styled.a`
  float: none;
  color: black;
  font-size: 14px;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  text-align: left;
  cursor: pointer;
`;

const DarkCheck = styled.div`
  float: right;
  margin-top: 22px;
  margin-left: 20px;
`;

const NavSearch = styled.div`
  margin-top: 20px;
  float: right;
  margin-left: 50px;
`;

const SearchInput = styled.input`
  height: 20px;
  border: none;
  border-bottom: 1px solid black;
`;

const SearchButton = styled.button`
  border: none;
  border-radius: 5px;
  margin-left: 3px;
`;

const NavCart = styled.div`
  margin-top: 20px;
  float: right;
  margin-left: 50px;
  margin-right: 50px;
`;