import React, { useState, useEffect } from 'react';

function Photos ({photos, enlargeCurImage, icon}) {
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
    <div className = 'Photos'>
      <div className = 'images'> {photos.map((photo, index, array) => {
            if(index === curImage) {
              return (<div><img id = 'curImage' key = {photo['thumbnail_url']} src = {photo['thumbnail_url']} width = '100px' ></img></div>);
            } else {
              return (<div><img id = 'othImage' key = {photo['thumbnail_url']} src = {photo['thumbnail_url']} width = '100px' onClick = {() => changeImage(index)}></img></div>)
            }
          })}
      </div>
      <div className = 'curImage'>
        <div className = 'numcurImage'> {curImage + 1} / {photos.length}</div>
        <a className ="prev" onClick={()=>changeCurImage(curImage, 'prev')}>&#9664;</a>
        <img id = 'centerImg' src = {photos[curImage]['url']}></img>
        <a className ="next" onClick={()=>changeCurImage(curImage, 'next')}>&#9654;</a>
        <a className ="enlarge" onClick={()=>enlargeCurImage(curImage)}>
          {icon} </a>


      </div>

    </div>
  );
}

export default Photos;