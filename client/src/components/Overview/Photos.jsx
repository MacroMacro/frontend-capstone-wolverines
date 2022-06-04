import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

function Photos ({ photos }) {
  const [curImage, setCurImg] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);

  function changeCurImage(i, key) {
    if (key === 'prev' && i > 0) {
      setCurImg(i-1);
    }
    if (key === 'next' && i < nphotos){
      setCurImg(i+1);
    }
  }

  const nphotos = photos.length -1;

  const imageFullscreen = {
    width: fullscreen? 1200: 600,
    height: 800,
    objectFit: 'cover',
    textAlign: 'center',
    padding: '10px',
    cursor: fullscreen? 'zoom-out' : 'zoom-in',
    overflow: fullscreen? 'scroll' : 'hidden'
  };

  document.getElementById('overview').style.display = fullscreen ? 'none':'block';

  return (
    <Images id = 'Images'>
      <ImageGalleryContainer id = 'ImageGallery'>
        <i className = "material-symbols-outlined" onClick={()=>changeCurImage(curImage, 'prev')}>arrow_upward</i>
        <ImagesTN>
          { photos.map((photo, index, array) => {
              if(index === curImage) {
                return (<div key={ index }><ImageCurTN src = {photo['thumbnail_url']} ></ImageCurTN></div>);
              } else {
                if (index >= curImage) {
                  return (<div key={ index }><ImageOthTN key = {index} src = {photo['thumbnail_url']}
                    onClick = {() => setCurImg(index)}></ImageOthTN></div>)
                }
              }
            })}
        </ImagesTN>
        <i className = "material-symbols-outlined" onClick={()=>changeCurImage(curImage, 'next')}>arrow_downward</i>
      </ImageGalleryContainer>

      <ImageMainContainer id = 'ImageMain'>
        { curImage === 0 ? <Prev onClick={()=>changeCurImage(curImage, 'prev')} ></Prev> :
          <Prev onClick={()=>changeCurImage(curImage, 'prev')} ><div style = {{'margin-top': 400}} >&#10094;</div></Prev> }
        <div onClick = {() => setFullscreen(!fullscreen)}>
          <ImageMain className = 'centerImg' id = 'centerImg' src = {photos[curImage]['url']} style = { imageFullscreen } ></ImageMain>
        </div>
        { curImage === nphotos ?  <Next onClick={()=>changeCurImage(curImage, 'next')}></Next> :
          <Next onClick={()=>changeCurImage(curImage, 'next')}><div style = {{'margin-top': 400}} >&#10095;</div></Next>}
      </ImageMainContainer>

    </Images>
  );
}

export default Photos;

const Images = styled.div`
  height: 850px;
  width: 500px;
  margin-left: 80px;
`;

const ImageGalleryContainer = styled.div`
  text-align: center;
  position: absolute;
  width: 200px;
  height: 700px;
  overflow-y: hidden;
`;

const ImagesTN = styled.div`
  height: 620px;
  overflow-y: hidden;
`;

const ImageCurTN = styled.img`
  border: darkgrey solid 3px;
  margin: 2px auto;
  height: 80px;
  width: 80px;
  object-fit: cover;
`;

const ImageOthTN = styled.img`
  margin: 2px auto;
  height: 80px;
  width: 80px;
  object-fit: cover;
`;

const ImageMainContainer = styled.div`
  height: 700px;
  text-align: center;
  display: flex;
  margin-left: 20px;
`;

const ImageMain = styled.img`
  width: 100%;
  vertical-align: middle;
  z-index: -1;
`;

const Prev = styled.div`
  z-index: 0;
  cursor: pointer;
  margin-right: -40px;
  color: white;
  font-weight: bold;
  font-size: 40px;
`;

const Next = styled.div`
  z-index: 0;
  cursor: pointer;
  margin-left: -40px;
  color: white;
  font-weight: bold;
  font-size: 40px;
`;