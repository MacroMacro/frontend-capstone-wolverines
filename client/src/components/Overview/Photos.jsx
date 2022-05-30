import React, { useState, useEffect } from 'react';

function Photos ({photos, enlargeCurImage, icon}) {
  const [curImage, setCurImg] = useState(0);
  function changeImage(n) {
    setCurImg(n);
  }

  function changeCurImage(n, key) {
    if (key === 'prev') {
      setCurImg(n-1);
    } else {
      setCurImg(n+1);
    }
  }

  const n = photos.length -1;
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
      {curImage === 0 ? <div className ="prev" onClick={()=>changeCurImage(curImage, 'prev')} ></div>: <div className ="prev" onClick={()=>changeCurImage(curImage, 'prev')} ><div className = 'item' >&#10094;</div></div> }

        <img id = 'centerImg' src = {photos[curImage]['url']}></img>
      {curImage === n ?  <div className ="next" onClick={()=>changeCurImage(curImage, 'next')}> </div>:  <div className ="next" onClick={()=>changeCurImage(curImage, 'next')}><div className = 'item' >&#10095;</div></div>}

        {/* <div className ="enlarge" onClick={()=>enlargeCurImage(curImage)}>
           {icon} </div> */}


      </div>

    </div>
  );
}

export default Photos;