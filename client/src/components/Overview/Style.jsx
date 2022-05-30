import React, { useState } from 'react';
function Style ({style, curStyle, changeStyle}) {

  const thumbnails = style.reduce((imagesArray, stylei) => {
    imagesArray.push(stylei['photos'][0]['thumbnail_url']);
    return imagesArray;
  }, []);

  return (
    <div className = 'Style'>
      <a className = 'style-bar'>STYLE > </a> <a>{style[curStyle]['name']}</a>
      <div className = 'styles'>
      {thumbnails.map((link, index) => {
        if (index === curStyle) {
          return  <div className = 'styledisplay'><img className = 'styleimg' src = {link} width = '40px'></img><div className= 'check'> &#10004;</div></div>;
        } else {
          return  <div className = 'styledisplay' onClick = {() => changeStyle(index)} ><img src = {link} className = 'styleimg' width = '40px'></img></div>;
        }
      })}
      </div>
    </div>);
}
export default Style;