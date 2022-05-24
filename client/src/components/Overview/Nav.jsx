import React, { useState } from 'react';
function Nav () {
  const [search, setSearch] = useState();
  function changeSearch (e) {
    setSearch(e.target.value);
  };
  return (
    <div className = 'Nav'>
      <h2 className = 'header'>Wolverine</h2>
      <div className = 'cart'>
        <span className ="material-symbols-outlined">shopping_cart_checkout</span>
      </div>
      <div className = 'search-bar'>
        <input value = {search} onChange = {changeSearch}></input>
        <button>🔍</button>
      </div>
    </div>
  )
}

export default Nav;