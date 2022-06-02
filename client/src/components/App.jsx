import React, { useState, useEffect } from 'react';
import Overview from './Overview/Overview.jsx';
import ReviewList from './Reviews/ReviewList.jsx';
import QandAs from './QandAs/QandAs.jsx';
import RelatedItems from './RelatedItems/RelatedItems.jsx';
import axios from 'axios';

function App () {
  // Remember to change individual github tokens when you pull down the repo to your local!

  const[curProduct, setCurProduct] = useState(0);
  const[products, setProduct] = useState([]);
  //Modal States

  const[productID, setProductID] = useState('');



  useEffect(() => {
    axios.get('/products')
      .then((response) =>{setProduct(response.data); setProductID(response.data[0].id); console.log('products', response.data, response.data[0].id)})
      .catch(err => console.log(err));
  }, [])

  function searchProduct (str) {
    products.map((product, index) => {
      if(product['name'].toLowerCase().indexOf(str) !== -1) {
        setCurProduct(index);
      }
    })
  }

  function updateProduct (productID) {
    setProductID(productID);
    products.map((product, index) => {
      if(product['id'] === productID){
        setCurProduct(index);
      }
    })
  }
  //Load products again for Q&A Fns
  const loadProducts = () => {
    axios.get('/products')
      .then((response) => {setProduct(response.data); console.log('products', response.data)})
      .catch(err => console.log(err));
  }



  return (
    <>
    {console.log(products, curProduct, productID, 'seee')}
    {productID ? (
      <div>

      {/* {someState.reviews[0]['count']} */}

        <Overview product = {products[curProduct]} searchProduct = {searchProduct}/>
        <RelatedItems product={products[curProduct]} productID={productID} updateProduct={updateProduct}/>
        <QandAs product_id={products[curProduct].id} product_name={products[curProduct].name}/>
        <ReviewList id={products[curProduct].id}/>
      </div>
    ) : (
      <div id = 'test'><h1>Hello world</h1></div>
    )}
    </>
  )
}

export default App;