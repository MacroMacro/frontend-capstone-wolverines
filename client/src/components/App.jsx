import React, { useState, useEffect } from 'react';
import Overview from './Overview/Overview.jsx';
// import Reviews from './Reviews/Reviews.jsx';
// import QandAs from './QandAs/QandAs.jsx';
// import RelatedItems from './RelatedItems/RelatedItems.jsx';

import axios from 'axios';
function App () {
  // Remember to change individual github tokens when you pull down the repo to your local!
  const[someState, setStatefn] = useState({
    products:[{'name': 'LL'}],
    product_id: '40344'

  })


  // const onLoad = () => {
  //   axios.get('/products')
  //     .then((response) =>{setStatefn({products: response.data}); console.log('products', response.data)})
  //     .catch(err => console.log(err));

  //     // var reviews = [];
  //     // someState.products.map((product)=> axios.get(`/reviews/?id=${product['id']}`)
  //     //   .then((response)=>reviews.push(response.data))
  //     //   .catch(err => console.log(err)));

  //     // setStatefn({reviews: reviews});
  // }



  // useEffect(onLoad, []);



  return(
    <div id = 'test'>Hello world
    {/* {someState.reviews[0]['count']} */}

      {/* <Overview product_id = {someState.product_id}/> */}
      {/* <Reviews product_id = {someState.product_id} />
      <QandAs product_id = {someState.product_id}/>
      <RelatedItems product_id = {someState.product_id}/> */}
    </div>
  );
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