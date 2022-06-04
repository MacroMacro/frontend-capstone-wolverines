require('dotenv').config();
const express = require('express');
const app = express();
const PORT = 3000 || process.env.PORT;
const axios = require('axios');
const bodyParser = require('body-parser');
// const morgan = require('morgan');
const { cloudinary } = require('./utils/cloudinary')

// app.use(morgan('dev'));
app.use(express.static('client/dist'));
app.use(express.json({limit: '50mb'}));
app.use(bodyParser.json());
app.listen(PORT, () => { console.log(`Server listening on port: ${PORT}`); })

//get products
app.get('/products', (req, res) => {
  axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products', { headers: {'Authorization': process.env.token}})
  .then((data)=> {res.status(200).send(data.data)})
  .catch((err) => {res.status(500).send(err);});
});

/*Reviews */
//get reviews for specific product id
//from client end: axios.get('/reviews/?id=40344')
// `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/?product_id=${id}&&count=100`
app.get('/reviews/:id', (req, res) => {
  var id = req.params.id;
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/?product_id=${id}&&count=300`, { headers: {'Authorization': process.env.token}})
  .then((data)=> {res.status(200).send(data.data)})
  .catch((err) => {res.status(500).send(err);});
});

app.get('/reviews/meta/:id', (req, res) => {
  var id = req.params.id;
  //console.log('id', id);
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/meta/?product_id=40344`, { headers: {'Authorization': process.env.token}})
  .then((data)=> {
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
  var id = req.params.review_id;
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
  .catch((err) => {res.status(500).send(err);});
});

/*       ------       QandAs       ------       */
//get QandAs for specific product id
//from client end: axios.get('/qa/questions/?id=40344&page='page_number&count=5')
app.get('/qa/questions/', (req, res) => {
  const { product_id: id }  = req.query
  const searchTerm = req.query.search !== 'null'
    ? req.query.search
    : null

  var count = 1000;
  // console.log('product_id: ', req.query.product_id);
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/?product_id=${id}&count=${count}`, { headers: {'Authorization': process.env.token}})
  .then((data)=> {
    /*console.log(data);*/
    /* filter the results */
    if (searchTerm) {
      let questions = data.data.results;
      questions = questions.filter(question => {
        const question_body = question.question_body.toLowerCase();
        if (question_body.includes(searchTerm)) {
          return true;
        } else {
          return false;
        }
      })
      res.status(200).send({ results: questions });
    } else {
      res.status(200).send(data.data);
    }
  })
  .catch((err) => {res.status(500).send(err);});
});

//593082
//Question helpfulness from client end: axios.put('/helpful/qa/?id=1135681')
app.put('/qa/questions/:question_id/helpful', (req, res) => {
  const { question_id} = req.params;
  // var id = req.params['id'];
  axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/${question_id}/helpful`,{}, { headers: {'Authorization': process.env.token}})
  .then((data)=> { res.status(200).send(data.data)})
  .catch((err) => {res.status(500).send(err);});
});

//Question Report from client end: axios.put('/report/qa/?id=1135681')
app.put('/qa/questions/:question_id/report', (req, res) => {
  const { reported } = req.params;
  axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/${reported}/report`, {}, { headers: {'Authorization': process.env.token}})
    .then((data)=> { res.status(200).send(data.data)})
    .catch((err) => { res.status(500).send(err);});
});

//MARK ANSWER AS HELPFUL
app.put('/qa/answers/:answer_id/helpful', (req, res) => {
  const {answer_id} = req.params;
  axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/answers/${answer_id}/helpful`, {}, { headers: {'Authorization': process.env.token}})
    .then((data) => { res.status(200).send(data.data)})
    .catch((err) => { res.status(500).send(err);});
});

//REPORT ANSWER
app.put('/qa/answers/:answer_id/report', (req, res) => {
  const { answer_id } = req.params;
  axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/answers/${answer_id}/report`, {}, { headers: {'Authorization': process.env.token}})
    .then((data)=> { res.status(200).send(data.data)})
    .catch((err) => {res.status(500).send(err);});
});

//POSTing question to the server
app.post('/qa/questions', (req, res) => {
  // const { product_id } = req.params;
  const values = req.body;
  const newQ = {
    body: values.question,
    // product_id: parseInt(product_id),
    email: values.email,
    name: values.name,
    product_id: values.product_id
  }

  axios.post(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions`, newQ, { headers: {'Authorization': process.env.token}})
    .then((data) => { res.status(201).send(data.data)})
    .catch(err => { res.status(500).send(err)});
})

//POSTing Answer to given question
 //parameters - question_id
  //body params - body, name, email, [photos]
app.post('/qa/questions/:question_id/answers', (req, res) => {
  const { question_id } = req.params;
  const answerResponses = req.body;
  // console.log(req.body);

  axios.post(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/${question_id}/answers`, {
    name: answerResponses.name,
    email: answerResponses.email,
    body: answerResponses.body,
    photos: answerResponses.photos,
  }, { headers: {'Authorization': process.env.token}})
    .then((results) => { res.status(201).send(results.data)})
    .catch(err => console.log('error posting answer in server, ', err));
})

//CLOUDINARY POST
app.post('/api/upload', async (req, res) => {
  try {
    // console.log('req body', req.body, req.body.data.length);

    const { data } = req.body;
    const photoUrls = []

    for (let i = 0; i < data.length; i++) {
      const uploadedResponse = await cloudinary
        .uploader
        .upload(data[i], {upload_preset: 'ml_default'})
      photoUrls.push(uploadedResponse.url)
    }

    res.status(201).send({status: 'ok', data: photoUrls});

  } catch (error) {
    res.status(500).send('err something went wrong', error)
  }
})

//CLOUDINARY GET -- probably need to change fodler
// app.get('/api/images', async (req, res) => {
//   const { resources } = await cloudinary.search.expression('folder:dev_setups')
//   .sort_by('public_id', 'desc')
//   .max_results(30)
//   .execute();
//   const publicIds = resources.map(file => file.public_id);
//   res.send(publicIds);
// })

//get cart info
app.get('/cart', (req, res) => {
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/cart`, { headers: {'Authorization': process.env.token}})
  .then((data)=> {res.status(200).send(data.data)})
  .catch((err) => { res.status(500).send(err);});
});

//add to cart
///axios.post('cart/?sku_id=1394799')
app.post('/cart', (req, res) => {
  var sku_id = req.query['sku_id'];
  axios.post(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/cart`, {"sku_id": sku_id}, { headers: {'Authorization': process.env.token}})
  .then((data)=> { res.status(200).send(data.data)})
  .catch((err) => {res.status(500).send(err);});
});

//get styles
//from client end: axios.get('/styles/?id=40344')
app.get('/styles', (req, res) => {
  var id = req.query['id'];
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${id}/styles`, { headers: {'Authorization': process.env.token}})
  .then((data)=> {res.status(200).send(data.data)})
  .catch((err) => {res.status(500).send(err);});
});

//get related
//from client end: axios.get('/related/?id=40344')
app.get('/related', (req, res) => {
  var id = req.query['id'];
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${id}/related`, { headers: {'Authorization': process.env.token}})
  .then((data)=> {
    res.status(200).send(data.data)})
  .catch((err) => {res.status(500).send(err);});
});

//get product
app.get('/product', (req, res) => {
  var id = req.query['id'];
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${id}`, { headers: {'Authorization': process.env.token}})
  .then((data)=> {
    res.status(200).send(data.data)})
  .catch((err) => {res.status(500).send(err);});
});

