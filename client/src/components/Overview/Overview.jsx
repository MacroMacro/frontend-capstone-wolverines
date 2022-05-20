import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Overview (product_id) {
  const [Style, setStylefn] = useState({
    styles: [],
    current_style: {},
  });


  const onLoad = ()=> {
    axios.get(`/styles/?id=${product_id['product_id']}`)
    .then((response)=> {
      setStylefn({styles : response.data['results']}); //array of styles
    })
    .catch((err) => alert(`can't load for product with id ${product_id['product_id']}`));
  };

  useEffect(onLoad, []);



  //const [style, stylefn] = useState([])
  //product ->
  //product['photos'][i]['url'];

  //product['photos'][i]['thumbnail_url'];


  //product['photos'].length;
  if (Style.styles.length > 0) {
    return (
      <div>
        <div className = 'imageGallery'>
        {Style.styles[0]['photos'].map((photo) =>
          <img src = {photo['url']} width="150" height="180"></img>)}
        </div>
        <div className = 'mainImage'>
          <img src = {Style.styles[0]['photos'][0]['url']}></img>
        </div>

      </div>
    )
  } else {
    return ('loading');
  }
}

export default Overview;