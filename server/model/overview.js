const db = require('../db');
const overview = db.overview;

module.exports={
  // /products
  getTest: function(callback) {
    query='select id from test';
    overview.query(query, (err, data)=> {
      if(err) {
        callback(err);
      }else {

        callback(null, data);
      }
    })

  },
  getProducts:function (page, count,callback) {
    var query = `select * from products limit ${count} offset ${page}`;

    overview.query(query, (err, data)=> {
        if(err) {
          callback(err);
        }else {

          callback(null, data);
        }
      })
    },
  //products/id/related
  getRelated: function (productid, callback) {
    var query=`select relatedid from related where productid=${productid}`
    overview.query(query, (err, data) =>{
      if(err) {
        callback(err);
      }else {
        callback(null, data)
      }
    })
  },
  //products/id
  getOneProduct: function (productid, callback) {
    var query =`select * from features LEFT JOIN products on products.id=features.productid where products.id=${productid}`;

    overview.query(query, (err, data) =>{
      if(err) {
        callback(err);
      }else {
        callback(null, data)
      }
    })
  },
  //get the styles without sku part;
  getStyles: function (productid, callback) {
    console.log('test1', productid)
    var query =`
    select styles.id AS "style_id",
    name,
    origin_price AS "original_price",
    sale_price,
    default_style AS "default?",
    (select
       json_agg(json_build_object('url',photos.url,'thumbnail_url',photos.thumbnail_url)) from photos where photos.styleid=styles.id) AS "photos",

    (select
      json_object_agg(sku.id, json_build_object('quantity',sku.quantity,'size',sku.size)) from sku where sku.styleid=styles.id
    )AS "skus"
    from styles where styles.productid=${productid}
    ORDER BY styles.id
    `

  //get photos where photo.styleid=style.id
  //get sku where sku.styleid=style.id

    overview.query(query, (err, data) =>{
      if(err) {
        callback(err);
      }else {
        console.log('test3')
        callback(null, data)
      }
    })
  }


}