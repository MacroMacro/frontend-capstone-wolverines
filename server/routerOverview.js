var router=require('express').Router();

var modelOverview=require('./model');
var model=modelOverview.model;

router.get('/products', (req, res)=>{

  var count=req.query['count']||5;
  var skip=req.query['page']||1;
  var page=count*(skip-1);
  model.getProducts(page, count, (err, data) => {
    if (err) {
      res.send(err);
    }else{
      res.status(201).send(data.rows);
    }
  })
});

router.get('/related', (req, res)=>{
  var productid = req.query['id'];
  model.getRelated( productid, (err, data) => {
    if (err) {
      res.send(err);
    }else{
      var relates=data.rows;
      var relatedId=[];
      for (let i=0; i<relates.length; i++) {
         relatedId.push(relates[i]['relatedid']);
      }
      res.status(201).send(relatedId);
    }
  })
});

router.get('/id', (req, res)=>{
  var productid = req.query['id'];
  model.getFeatures( productid, (err, data)=>{
    if(err) {
      res.send(err);
    }else {
      res.send(data.rows[0]);
    }
  })
});

router.get('/styles', (req, res)=>{
  var productid = req.query['id'];
  model.getStyles( productid, (err, data)=> {
    if(err) {
      res.send(err);
    }else {
      var result={};
      result.product_id=Number(productid);
      result.results=data.rows;
      res.send(result);
    }
  })
})

module.exports=router;