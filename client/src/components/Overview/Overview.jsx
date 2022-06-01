import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Photos from './Photos.jsx';
import Skus from './Skus.jsx';
import Nav from './Nav.jsx';
import Style from './Style.jsx';
import StarRating from 'react-star-ratings';
import {FacebookIcon, PinterestIcon,TwitterIcon } from 'react-share';
import Share from './Share.jsx';
import styled from 'styled-components';

//Get all the styles data for a product given product id
//Pass down style specific data
function Overview ({product, navBar, searchProduct, updateProduct}) {
  const [style, setStyle] = useState([]);
  const [curStyle, setCurStyle] = useState(null);
  const [rating, setRating] = useState(0);
  const [price, setPrice] = useState(product['default_price']);
  const [largeImg, setlargeImg] = useState(0);
  const [numRating, setNumRating] = useState(' ');
  // const [icon, setIcon] = useState(<span className="material-symbols-outlined">fit_screen</span>);


  const onLoad = ()=> {
    axios.get(`/styles/?id=${product['id']}`)
    .then((response)=> {
      let results = response.data['results'];
      setStyle(results);
      for (var i = 0; i < results.length; i ++ ) {
        if (results[i]['default?'] === true) {
          setCurStyle(i);
          break;
        }
      }
    })
    .catch((err) => console.log(`can't load for product with id ${product['id']}`));

//rating bar
    axios.get(`/reviews/${product['id']}`)
    .then((response)=> { return ([response.data['results'].reduce((prev, cur) => prev = prev + cur['rating'], 0), response.data['results'].length])})
    .then(([total, nums]) => {setRating(total/nums); setNumRating(nums);})
    .catch((err) => console.log(`can't load for product with id ${product['id']}`));
  };

  useEffect(onLoad, [product['id']]);

  function changeStyle(n) {
    setCurStyle(n);
  }

  function addYourOutfit (starred) {
    if (starred === 0) {
      localStorage.setItem(product['id'], product['id']);
    } else {
      delete localStorage[product['id']];
    }
  }

  return (
  <div className = 'ProductOverview'>
    <Nav searchProduct = {searchProduct} navBar = {navBar} updateProduct = {updateProduct}/>
    {style.length ? (
      <div>
        <MainOverview>
          {curStyle !== null ? (<Photos photos = {style[curStyle]['photos']} />) : (<a>Loading Styles</a>) }

          <ProductInfo id = 'overview'>
            <div>
              <StarRating rating = {rating} id = 'OverviewRating' starRatedColor="#FFCC00" starEmptyColor ='grey' starSelectingHoverColor = 'black' numberOfStars={5} name='rating' starDimension="15px" starSpacing="0px"/>
              <a style = {{'margin-left': '10px'}}>{rating.toFixed(1)}</a>
              <a href="#reviewList" style = {{'margin-left': '10px'}} >Read all {numRating} reviews</a>
            </div>
            <ProductCat> {product['category']}</ProductCat>
            <ProductName>{product['name']}</ProductName>

            {curStyle !== null ?
            (<ProductPrice>{
              style[curStyle]['sale_price'] === null ? (<>${style[curStyle]['original_price']}</>) : (<><ProductSale> ${style[curStyle]['sale_price']}</ProductSale><ProductOrg>${style[curStyle]['original_price']}</ProductOrg></>)
            }</ProductPrice>) : (<div>Loading prices</div>)}

            {curStyle !== null ? (<>
            <Style style = {style} curStyle = {curStyle} changeStyle = {changeStyle} />
            <Skus changeStyle = {changeStyle} addYourOutfit = {addYourOutfit} skus= {style[curStyle]['skus']}/> </>) : (<a>Loading Skus</a>)}

            {curStyle !== null ?
            (<Share url = {style[curStyle]['photos'][0]['url']} quote = {`Check out ${product['name']} with style ${style[curStyle]['name']}`}/>) : (<><FacebookIcon size={40} round /><TwitterIcon size={40} round /><PinterestIcon size={40} round /></>)}
          </ProductInfo>
        </MainOverview>

      <Slogan>{product['slogan']}</Slogan>
      <Description>{product['description']}</Description>
    </div> ): (<div>Welcome to Wolverine ... </div>) }
  </div>)
}

export default Overview;

const MainOverview = styled.div`
  display: flex;
  margin: 40px 100px;
`;

const ProductInfo = styled.div`
  width: 40%;
  margin-left: 200px;
  margin-top: 20px;
`;

const ProductCat = styled.div`
  font-size: 25px;
  color: grey;
  margin-top: 20px;
  text-transform: uppercase;
`;

const ProductName = styled.div`
  font-size: 35px;
  margin-top: 20px;
  font-weight: bold;
`;

const ProductPrice = styled.div`
  margin-top: 15px;
  height: 40px;
  font-size: 20px;
`;

const ProductSale = styled.span`
  color: red;
  font-weight: bold;
  font-size: 20px;
`;

const ProductOrg = styled.span`
  text-decoration: line-through;
  margin-left: 10px;
  font-size: 20px;
`;

const Slogan = styled.div`
  margin-top: 10px;
  margin-left: 100px;
  font-size: 20px;
  color: grey;
`;

const Description = styled.div`
  font-size: 18px;
  margin-top: 20px;
  margin-left: 100px;
`;