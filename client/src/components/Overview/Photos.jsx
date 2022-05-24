import React, { useState, useEffect } from 'react';

function Photos ({photos}) {
  const [curImage, setCurImg] = useState(0);
  function changeImage(n) {
    setCurImg(n);
  }

  function changeCurImage(n, key) {
    if (key === 'prev') {
      if(n === 0) { setCurImg(photos.length -1);}
      else { setCurImg(n-1);}
    } else {
      if (n === photos.length -1) {setCurImg(0);}
      else {setCurImg(n+1);}
    }
  }

  return (
    <div>
      <div className = 'images'> {photos.map((photo, index, array) => {
            if(index === curImage) {
              return (<div><img id = 'curImage' src = {photo['thumbnail_url']} width = '5%' ></img></div>);
            } else {
              return (<div><img id = 'othImage' src = {photo['thumbnail_url']} width = '5%' onClick = {() => changeImage(index)}></img></div>)
            }
          })}
      </div>
      <div className = 'curImage'>
        <div className = 'numcurImage'> {curImage + 1} / {photos.length}</div>
        <a className ="prev" onClick={()=>changeCurImage(curImage, 'prev')}>&#9664;</a>
        <a className ="next" onClick={()=>changeCurImage(curImage, 'next')}>&#9654;</a>
        <img src = {photos[curImage]['url']} width = "500px"></img>
      </div>

    </div>
  );
}

export default Photos;