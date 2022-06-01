import React, { useState, useEffect } from 'react';
import Overview from './Overview/Overview.jsx';
import ReviewList from './Reviews/ReviewList.jsx';
import QandAs from './QandAs/QandAs.jsx';
import AddQuestion from './QandAs/AddQuestion.jsx';
import AddAnswer from './QandAs/AddAnswer.jsx';
import RelatedItems from './RelatedItems/RelatedItems.jsx';
import Footer from './Overview/Footer.jsx';
import axios from 'axios';

function App () {
  // Remember to change individual github tokens when you pull down the repo to your local!

  const[curProduct, setCurProduct] = useState(0);
  const[products, setProduct] = useState([]);
  //Modal States
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const[productID, setProductID] = useState('');

  const [showAnswerForm, setShowAnswerForm] = useState(false);

  const [currentQID, setCurrentQID] = useState(0);

  const [currentQBody, setCurrentQBody] = useState('');

  useEffect(() => {
    axios.get('/products')
      .then((response) =>{setProduct(response.data); setProductID(response.data[0].id);})
      .catch(err => console.log(err));
  }, [])

  const navBar = {};
  products.map((product) => {
    if (navBar[product['category']]) {
      navBar[product['category']].push({'id': product['id'], 'name': product['name']});
    } else {
      navBar[product['category']] = [{'id': product['id'], 'name': product['name']}];
    }
  })

  console.log('nav',navBar);

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
      .then((response) => {setProduct(response.data);})
      .catch(err => console.log(err));
  }

  //toggle for states
  const toggleQuestionForm = () => {
    setShowQuestionForm(!showQuestionForm);
  }

  const toggleAnswerForm = (id, body) => {
    setShowAnswerForm(!showAnswerForm);
    setCurrentQID(id);
    setCurrentQBody(body);
  }

  //submission Fns
  const questionSubmit = () => {
    setShowQuestionForm(false);
    loadProducts();
    console.log('question submitted');
  }

  const answerSubmit = () => {
    setShowAnswerForm(false);
    loadProducts();
    console.log('answer submitted');
  }

  //set states to false
  const setQFalse = () => {
    setShowQuestionForm(false);
  }

  const setAFalse = () => {
    setShowAnswerForm(false);
  }

  //update question ID for answer modal
  const updateAnswerID = (id) => {
    setCurrentQID(id);
  }

  return (
    <>
    {console.log(products, curProduct, productID, 'seee')}
    {productID ? (
      <div>
        {showQuestionForm && !showAnswerForm ? (
          <AddQuestion product_id={products[4].id} questionSubmit={questionSubmit} product_name={products[4].name} setQFalse={setQFalse}/>
        )
        :
        !showQuestionForm && showAnswerForm ? (
          <AddAnswer product_name={products[4].name} question_id={currentQID} currentQBody={currentQBody} reloadFn={answerSubmit} setAFalse={setAFalse}/>
        )
        :
        ( null )}
      {/* {someState.reviews[0]['count']} */}

        <Overview product = {products[curProduct]} navBar = {navBar} searchProduct = {searchProduct} updateProduct = {updateProduct}/>
        <RelatedItems product={products[curProduct]} productID={productID} updateProduct={updateProduct}/>
        <ReviewList id={products[curProduct].id}/>
        <QandAs product_id={products[4].id} toggleQuestionForm={toggleQuestionForm} toggleAnswerForm={toggleAnswerForm} updateAnswerID={updateAnswerID}/>
        <Footer/>
      </div>
    ) : (
      <div id = 'test'><h1>Loading...</h1></div>
    )}
    </>
  )
}

export default App;