import React, { useState, useEffect } from 'react';
import Overview from './Overview/Overview.jsx';
// import Reviews from './Reviews/Reviews.jsx';
// import QandAs from './QandAs/QandAs.jsx';
import RelatedItems from './RelatedItems/RelatedItems.jsx';

import axios from 'axios';

function App () {
  // Remember to change individual github tokens when you pull down the repo to your local!
  const[someState, setStatefn] = useState({
    products:[],
    product_id: ''
  })

  const[curProduct, setCurProduct] = useState(0);
  const[products, setProduct] = useState({});


  useEffect(() => {
    axios.get('/products')
      .then((response) =>{setProduct(response.data); console.log('products', response.data)})
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


  if (products.length>1) {
    return(
      <div>
      {/* {someState.reviews[0]['count']} */}

        <Overview product = {products[curProduct]} searchProduct = {searchProduct}/>
        <RelatedItems product={products[curProduct]} productID={products[curProduct].product_id}/>
        {/* <Reviews product_id = {someState.product_id} />
        <QandAs product_id = {someState.product_id}/>
        */}
      </div>
    );
  } else {
    return <div id = 'test'>Hello world></div> ;
  }

}

/*
function App() {
  const[someState, setStatefn] = useState({
    person: 'Barry'
  })
  useEffect(() => {
    // Update the document title using the browser API
    document.title = `You clicked hello times`;
  });
  var newvar = "Barry";

  const changeHandler = (e) => {
    setStatefn({person: e.target.value});
  }

  const clickHandler = (e) => {
    e.preventDefault();
  }

  return (
      <div>
      <div>Hello World</div>
      <input onChange = {(e) => changeHandler(e)} value = {someState.person}></input>
      <button onClick = {(e) => clickHandler(e)}>Click</button>
      </div>
  );
}
*/
export default App;