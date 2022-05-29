import React, { useState, useEffect } from 'react';

function Photos ({photos, enlargeCurImage, icon}) {
  const [curImage, setCurImg] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
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

  function changeFullscreen() {
    setFullscreen(!fullscreen);
    console.log('fullscreen', fullscreen);
  }

  if (fullscreen) {
    imageFullscreen = {
      width: 1000,
      height: 670,
      objectFit: 'cover',
      textAlign: 'center',
      padding: '10px',
      cursor: 'zoom-out'
    };
    document.getElementById('overview').style.display = 'none';
  } else {
    imageFullscreen = {
      width: 480,
      height: 670,
      objectFit: 'cover',
      textAlign: 'center',
      padding: '10px',
      cursor: 'zoom-in'
    };
    document.getElementById('overview').style.display = 'block';
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

      <div className = 'curImage' >
      {curImage === 0 ? <div className ="prev" onClick={()=>changeCurImage(curImage, 'prev')} ></div>: <div className ="prev" onClick={()=>changeCurImage(curImage, 'prev')} ><div className = 'item' >&#10094;</div></div> }

       <div onClick = {changeFullscreen}> <img className = 'centerImg' id = 'centerImg' src = {photos[curImage]['url']} style = {imageFullscreen} ></img> </div>

      {curImage === n ?  <div className ="next" onClick={()=>changeCurImage(curImage, 'next')}> </div>:  <div className ="next" onClick={()=>changeCurImage(curImage, 'next')}><div className = 'item' >&#10095;</div></div>}

        {/* <div className ="enlarge" onClick={()=>enlargeCurImage(curImage)}>
           {icon} </div> */}


      </div>

    </div>
  );
}

export default Photos;

var imageFullscreen = { // initial #image css but then changes depending if clickedFullScreen ever got invoked
    width: 480,
    height: 670,
    objectFit: 'cover',
    textAlign: 'center',
    padding: '10px',
    cursor: 'zoom-in'
  };
