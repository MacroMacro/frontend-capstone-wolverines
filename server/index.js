require('dotenv').config();
const express = require('express');
const app = express();
const PORT = 3000 || process.env.PORT;
const axios = require('axios');
const bodyParser = require('body-parser');
const morgan = require('morgan');

app.use(morgan('dev'));
app.use(express.static('client/dist'));
app.use(express.json());
app.use(bodyParser.json());
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
})
//get products
app.get('/products', (req, res) => {
  axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products', { headers: {'Authorization': process.env.token}})
  .then((data)=> {res.status(200).send(data.data)})
  .catch((err) => {console.log('err', err); res.status(500).send(err);});
});


/*Reviews */
//get reviews for specific product id
//from client end: axios.get('/reviews/?id=40344')
// `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/?product_id=${id}&&count=100`
app.get('/reviews/:id', (req, res) => {
  var id = req.params.id;
  console.log('id', id);
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/?product_id=${id}&&count=100`, { headers: {'Authorization': process.env.token}})
  .then((data)=> {res.status(200).send(data.data)})
  .catch((err) => {res.status(500).send(err);});
});

app.get('/reviews/meta/:id', (req, res) => {
  var id = req.params.id;
  //console.log('id', id);
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/meta/?product_id=40344`, { headers: {'Authorization': process.env.token}})
  .then((data)=> {
    console.log(data.data)
    res.status(200).send(data.data)})
  .catch((err) => {res.status(500).send(err);});
});

app.post('/reviews/:id', (req, res) => {
  var id = req.params.id;
  axios.post(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews`, req.body, { headers: {'Authorization': process.env.token}})
  .then(response => {
    // console.log('this is the res', response)
    res.status(200).send('wasabi is too spicy')
  })
  .catch(err => {
    res.status(500).send(err)
  })
})

//review_id:1135681
//from client end: axios.put('/helpful/review/?id=1135681')
app.put('/reviews/:review_id/helpful', (req, res) => {
  console.log('req', req.query);
  var id = req.params.review_id;
  console.log('id',id); // undefined
  axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/${id}/helpful`, id ,{ headers: {'Authorization': process.env.token}})
  .then((data)=> { res.status(200).send(data.data)})
  .catch((err) => { res.status(500).send(err);});
});

//review_id:1135681
//from client end: axios.put('/report/review/?id=1135681')
app.put('/report/review', (req, res) => {
  var id = req.query['id'];
  axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/${id}/report`, id, { headers: {'Authorization': process.env.token}})
  .then((data)=> { res.status(200).send(data.data)})
  .catch((err) => {console.log('err', err); res.status(500).send(err);});
});

/*QandAs*/
//get QandAs for specific product id
//from client end: axios.get('/qa/questions/?id=40344')
app.get('/qa/questions/', (req, res) => {
  var id = req.query['product_id'];
  console.log('product_id: ', req.query.product_id);
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/?product_id=${id}`, { headers: {'Authorization': process.env.token}})
  .then((data)=> {/*console.log(data);*/ res.status(200).send(data.data)})
  .catch((err) => {console.log('err', err); res.status(500).send(err);});
});
//593082
//from client end: axios.put('/helpful/qa/?id=1135681')
app.put('/helpful/qa/', (req, res) => {
  var id = req.query['id'];
  axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/${id}/helpful`,id, { headers: {'Authorization': process.env.token}})
  .then((data)=> { res.status(200).send(data)})
  .catch((err) => {console.log('err', err); res.status(500).send(err);});
});

//from client end: axios.put('/report/qa/?id=1135681')
app.put('/report/qa', (req, res) => {
  var id = req.query['id'];
  axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/${id}/report`, id, { headers: {'Authorization': process.env.token}})
  .then((data)=> { res.status(200).send(data.data)})
  .catch((err) => {console.log('err', err); res.status(500).send(err);});
});

//POSTing question to the server
app.post('qa/question', (req, res) => {
  let id = req.query['id'];
  axios.post(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/?product_id=${id}`, { headers: {'Authorization': process.env.token}})
    .then((data) => { res.status(201).send(data)})
    .catch(err => {console.log('error, ', err); res.status(500).send(err)});
})

//get cart info
app.get('/cart', (req, res) => {
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/cart`, { headers: {'Authorization': process.env.token}})
  .then((data)=> {console.log(data); res.status(200).send(data.data)})
  .catch((err) => {console.log('err', err); res.status(500).send(err);});
});

//add to cart
///axios.post('cart?sku_id=1394799')
app.post('/cart', (req, res) => {
  var sku_id = req.query['sku_id'];
  axios.post(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/cart`, {"sku_id": sku_id}, { headers: {'Authorization': process.env.token}})
  .then((data)=> {console.log(data); res.status(200).send(data.data)})
  .catch((err) => {console.log('err', err); res.status(500).send(err);});
});

//get styles
//from client end: axios.get('/styles/?id=40344')
app.get('/styles', (req, res) => {
  console.log('here?');
  var id = req.query['id'];
  console.log('id', id);
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${id}/styles`, { headers: {'Authorization': process.env.token}})
  .then((data)=> {res.status(200).send(data.data)})
  .catch((err) => {console.log('err', err); res.status(500).send(err);});
});

//get related
//from client end: axios.get('/related/?id=40344')
app.get('/related', (req, res) => {
  var id = req.query['id'];
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${id}/related`, { headers: {'Authorization': process.env.token}})
  .then((data)=> {
    res.status(200).send(data.data)})
  .catch((err) => {console.log('err', err); res.status(500).send(err);});
});

//get product
app.get('/product', (req, res) => {
  console.log('working?');
  var id = req.query['id'];
  console.log('id', id);
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${id}`, { headers: {'Authorization': process.env.token}})
  .then((data)=> {
    console.log(data.data)
    res.status(200).send(data.data)})
  .catch((err) => {res.status(500).send(err);});
});

