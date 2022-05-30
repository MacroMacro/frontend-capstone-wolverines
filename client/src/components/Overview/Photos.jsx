import React, { useState, useEffect } from 'react';

function Photos ({photos, enlargeCurImage, icon}) {
  const [curImage, setCurImg] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);

  function changeCurImage(i, key) {
    if (key === 'prev' && i > 0) {
      setCurImg(i-1);
    }
    if (key === 'next' && i < n){
      setCurImg(i+1);
    }
  }

  const n = photos.length -1;

  var imageFullscreen = {
    width: fullscreen? 1200: 600,
    height: 700,
    objectFit: 'cover',
    textAlign: 'center',
    padding: '10px',
    cursor: fullscreen? 'zoom-out' : 'zoom-in',
  };

  document.getElementById('overview').style.display = fullscreen ? 'none':'block';

  return (
    <div className = 'Photos'>
      <div className = 'imagegallery'>
      <i className = "material-symbols-outlined" onClick={()=>changeCurImage(curImage, 'prev')}>arrow_upward</i>
        {photos.map((photo, index, array) => {
            if(index === curImage) {
              return (<div><img id = 'curImage' key = {photo['thumbnail_url']} src = {photo['thumbnail_url']} width = '100px' ></img></div>);
            } else {
              return (<div><img id = 'othImage' key = {photo['thumbnail_url']} src = {photo['thumbnail_url']} width = '100px' onClick = {() => setCurImg(index)}></img></div>)
            }
          })}
      <i className = "material-symbols-outlined" onClick={()=>changeCurImage(curImage, 'next')}>arrow_downward</i>
      </div>

      <div className = 'curImage' >
      {curImage === 0 ? <div className ="prev" onClick={()=>changeCurImage(curImage, 'prev')} ></div>: <div className ="prev" onClick={()=>changeCurImage(curImage, 'prev')} ><div className = 'item' >&#10094;</div></div> }

       <div onClick = {() => setFullscreen(!fullscreen)}> <img className = 'centerImg' id = 'centerImg' src = {photos[curImage]['url']} style = {imageFullscreen} ></img> </div>

      {curImage === n ?  <div className ="next" onClick={()=>changeCurImage(curImage, 'next')}> </div>:  <div className ="next" onClick={()=>changeCurImage(curImage, 'next')}><div className = 'item' >&#10095;</div></div>}

        {/* <div className ="enlarge" onClick={()=>enlargeCurImage(curImage)}>
           {icon} </div> */}


      </div>

    </div>
  );
}

export default Photos;
