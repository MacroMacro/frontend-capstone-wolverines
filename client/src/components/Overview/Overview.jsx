import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Photos from './Photos.jsx';
import Skus from './Skus.jsx';
import Nav from './Nav.jsx';
//Get all the styles data for a product given product id
//Pass down style specific data
function Overview ({product}) {
  const [style, setStyle] = useState([]);
  const [curStyle, setCurStyle] = useState(0);
  const [price, setPrice] = useState(product['default_price']);


  const onLoad = ()=> {
    axios.get(`/styles/?id=${product['id']}`)
    .then((response)=> { setStyle(response.data['results']);})
    .catch((err) => alert(`can't load for product with id ${product['id']}`));
  };

  useEffect(onLoad, []);

  function changeStyle(n) {
    setCurStyle(n);
    setPrice(style[n]['original_price']);
  }

  if (style.length > 0) {
    return (
      <div>
        <Nav/>
        <Photos photos = {style[curStyle]['photos']}/>
        <div className = 'overview'>
          <div className = 'category'> {product['category']}</div>
          <div className = 'name'> {product['name']}</div>
          <div >${price}</div>
        </div>
        <div>{style.map((stylei, index) => {//if (stylei['style_id'] === curStyle['style_id'])
          return  <div className = 'stylename' onClick = {() => changeStyle(index)} >{stylei['name']}</div>;
        })}</div>
        <Skus changeStyle = {changeStyle} skus= {style[curStyle]['skus']}/>
        <div className = 'slogan'>{product['slogan']}</div>
        <div className = 'description'>{product['description']}</div>
      </div>
    );
  } else {
    return (<h2>Loading...</h2>)
  }

}

export default Overview;
