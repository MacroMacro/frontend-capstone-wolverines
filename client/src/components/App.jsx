import React, { useState, useEffect } from 'react';
// import Overview from './Overview/Overview.jsx';
// import Reviews from './Reviews/Reviews.jsx';
import QandAs from './QandAs/QandAs.jsx'

// import RelatedItems from './RelatedItems/RelatedItems.jsx';

import axios from 'axios';

function App () {
  // Remember to change individual github tokens when you pull down the repo to your local!

  const[curProduct, setCurProduct] = useState(0);
  const[products, setProduct] = useState([]);


  useEffect(() => {
    axios.get('/products')
      .then((response) => {setProduct(response.data); console.log('products', response.data)})
      .catch(err => console.log(err));
  }, [])

  function searchProduct (str) {
    products.map((product, index) => {
      if(product['name'].toLowerCase().indexOf(str) !== -1) {
        setCurProduct(index);
        console.log('index', index);
      }
    })
  }
  return (
    <>
      {products.length ? (
        <div>
          {/* <Overview product={products[curProduct]} searchProduct={searchProduct}/> */}
          {/* <RelatedItems product={products[curProduct]} productID={searchProduct}/>  */}
          {/* <ReviewsList id={products[curProduct].id}/> */}
          <QandAs product_id={products[curProduct].id}/>

        </div>
      ) : (
        <div id='test'>Hello World</div>
      )}
    </>
  );

}
export default App;