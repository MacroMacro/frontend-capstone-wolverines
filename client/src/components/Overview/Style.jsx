import React, { useState } from 'react';
function Style ({style, curStyle, changeStyle}) {

  return (
    <div className = 'Style'>
      <a className = 'style-bar'>STYLE > </a> <a>SELECT STYLE</a>
      <div className = 'styles'>
      {style.map((stylei, index) => {
        if (index === curStyle) {
          return  <div className = 'styledisplay'>{stylei['name']} &#10004;</div>;
        } else {
          return  <div className = 'styledisplay' onClick = {() => changeStyle(index)} >{stylei['name']}</div>;
        }
      })}
      </div>
    </div>);
}
export default Style;