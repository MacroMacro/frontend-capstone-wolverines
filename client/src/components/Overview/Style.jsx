import React, { useState } from 'react';
import styled from 'styled-components';

function Style ({style, curStyle, changeStyle}) {

  const thumbnails = style.reduce((imagesArray, stylei) => {
    imagesArray.push(stylei['photos'][0]['thumbnail_url']);
    return imagesArray;
  }, []);

  return (
    <StyleContainer>
      <StyleBar><a>STYLE ></a> <a>{style[curStyle]['name']}</a> </StyleBar>
      <StyleDisContainer>
      {thumbnails.map((link, index) => {
        if (index === curStyle) {
          return  <StyleDisplay><StyleImg src = {link}></StyleImg><StyleCheck> &#10004;</StyleCheck></StyleDisplay>;
        } else {
          return  <StyleDisplay onClick = {() => changeStyle(index)} ><StyleImg src = {link}></StyleImg></StyleDisplay>;
        }
      })}
      </StyleDisContainer>
    </StyleContainer>);
}
export default Style;

const StyleContainer = styled.div`
  margin-top: 20px;
  height: 280px;
`;

const StyleBar = styled.div`
  font-weight: bold;
  font-size: 20px;
`;

const StyleDisContainer = styled.div`
  float: left;
  height: 250px;
`;

const StyleDisplay = styled.div`
  margin-top: 20px;
  width: 25%;
  display: inline-flex;
`;

const StyleImg = styled.img`
  border-radius: 50%;
  width: 70px;
  height: 70px;
  padding: 0px 5px;
`;

const StyleCheck = styled.div`
  position: absolute;
  margin-left: 70px;
  font-size: 25px;
  color: rgb(44, 24, 24);
`;