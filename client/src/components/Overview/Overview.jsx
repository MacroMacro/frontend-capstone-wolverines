import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Photos from './Photos.jsx';
import Skus from './Skus.jsx';
import Nav from './Nav.jsx';
import Style from './Style.jsx';
import StarRating from 'react-star-ratings';
import {FacebookIcon, PinterestIcon,TwitterIcon } from 'react-share';
import Share from './Share.jsx';
//Get all the styles data for a product given product id
//Pass down style specific data
function Overview ({product, searchProduct}) {
  const [style, setStyle] = useState([]);
  const [curStyle, setCurStyle] = useState(null);
  const [rating, setRating] = useState(0);
  const [price, setPrice] = useState(product['default_price']);
  const [largeImg, setlargeImg] = useState(0);
  const [numRating, setNumRating] = useState();
  const [icon, setIcon] = useState(<span className="material-symbols-outlined">fit_screen</span>);


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
    .then(([total, nums]) => {setRating(total/nums); setNumRating(nums);
    })
    .catch((err) => console.log(`can't load for product with id ${product['id']}`));
  };

  useEffect(onLoad, [product['id']]);

  const icons = [<span className="material-symbols-outlined">fit_screen</span>, <span className="material-symbols-outlined">fullscreen_exit</span>];

  function changeStyle(n) {
    setCurStyle(n);
  }

  function enlarge() {
    setIcon(icons[1-largeImg]);
    setlargeImg(1-largeImg);
  }

  function scrollReview () {
    console.log('document', document);
    console.log('scroll', document.getElementById('reviewList'));
    document.getElementById('reviewList').scrollIntoView();
  }

  function addYourOutfit (starred) {
    if (starred === 0) {
      localStorage.setItem(product['id'], product['id']);
    } else {
      delete localStorage[product['id']];
    }
  }

  return (
    <>
    <Nav searchProduct = {searchProduct}/>
    {style.length ? (
      <div>
      <div className = 'main-overview'>
        {curStyle !== null ? (<Photos photos = {style[curStyle]['photos']} enlargeCurImage = {enlarge} icon ={icon}/>) : (<a>Loading Styles</a>) }

        <div className = 'overview'>
          <div className = 'rating'>
            <StarRating rating = {rating} starRatedColor="black" starEmptyColor ='grey' starSelectingHoverColor = 'black' numberOfStars={5} name='rating' starDimension="15px" starSpacing="0px"/>
            <a className = 'reviewnum'>{rating}</a>

            {numRating ? (<a className = 'reviewlink' href="#reviewList" >Read all {numRating} reviews</a>) : (<a className = 'reviewlink' href="#reviewList" >Read all reviews</a>)}

          </div>
          <div className = 'category'> {product['category']}</div>
          <div className = 'name'><h2>{product['name']}</h2></div>

          {curStyle !== null ?
          (<div className = 'price'>{
            style[curStyle]['sale_price'] === null ? (<>${style[curStyle]['original_price']}</>) : (<><span id='salePrice'> ${style[curStyle]['sale_price']}</span><span id ='orgPrice'>${style[curStyle]['original_price']}</span></>)
          }</div>) : (<div>Loading prices</div>)}

          {curStyle !== null ? (<>
          <Style style = {style} curStyle = {curStyle} changeStyle = {changeStyle} />
          <Skus changeStyle = {changeStyle} addYourOutfit = {addYourOutfit} skus= {style[curStyle]['skus']}/> </>) : (<a>Loading Skus</a>)}

          {curStyle !== null ?
          (<Share url = {style[curStyle]['photos'][0]['url']} quote = {`Check out ${product['name']} with style ${style[curStyle]['name']}`}/>) : (<><FacebookIcon size={40} round /><TwitterIcon size={40} round /><PinterestIcon size={40} round /></>)}
        </div>
      </div>

      <div className = 'slogan'>{product['slogan']}</div>
      <div className = 'description'>{product['description']}</div>
    </div> )
    : (<div>Welcome to Wolverine ... </div>) }
  </>)

}

export default Overview;
